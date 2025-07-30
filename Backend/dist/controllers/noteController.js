import User from "../models/user.js";
export const fetchDetails = async (req, res) => {
    const user = req.user;
    // console.log(user,"fetch details hitted")
    if (!user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
        const existingUser = await User.findById(user._id).select("email name notes");
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({
            success: true,
            data: {
                email: existingUser.email,
                name: existingUser.name,
                notes: existingUser.notes,
            },
        });
    }
    catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};
export const addNote = async (req, res) => {
    const { note } = req.body;
    const user = req.user;
    console.log("add note is called ");
    if (!note) {
        return res.status(400).json({ success: false, message: "Note is required" });
    }
    if (!user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    console.log("add note is called ", note);
    try {
        const existingUser = await User.findById(user._id);
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        console.log("add note is called ", existingUser);
        existingUser.notes.unshift({ text: note });
        await existingUser.save();
        res.status(200).json({ success: true, message: "Note added successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
};
export const deleteNote = async (req, res) => {
    const user = req.user;
    const { noteId } = req.body;
    if (!noteId) {
        return res.status(400).json({ success: false, message: "Note ID is required" });
    }
    if (!user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(user._id, { $pull: { notes: { _id: noteId } } }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, message: "Note deleted successfully", data: updatedUser.notes, });
    }
    catch (error) {
        console.error("Error deleting note:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
