import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId } from "../lib/socket.js";
import {io} from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password'); 
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

// Get only users who have existing conversations with the logged-in user
export const getContactsForSidebar = async (req, res) => {
    try {
        const myId = req.user._id;

        // Find all messages where current user is sender or receiver
        const messages = await Message.find({
            $or: [{ senderId: myId }, { receiverId: myId }],
        }).select("senderId receiverId");

        // Collect unique other user IDs
        const contactIdsSet = new Set();
        for (const m of messages) {
            if (String(m.senderId) !== String(myId)) contactIdsSet.add(String(m.senderId));
            if (String(m.receiverId) !== String(myId)) contactIdsSet.add(String(m.receiverId));
        }

        const contactIds = Array.from(contactIdsSet);

        if (contactIds.length === 0) {
            return res.status(200).json([]);
        }

        const contacts = await User.find({ _id: { $in: contactIds } }).select("-password");
        res.status(200).json(contacts);
    } catch (error) {
        console.log("Error in getContactsForSidebar: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id:userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { id:receiverId } = req.params;
        const senderId = req.user._id;
        const { text, image } = req.body;

        let imageUrl;

        if (image) {
            // Save image to cloudinary
            const uploadedResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadedResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        // real-time messaging using socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

