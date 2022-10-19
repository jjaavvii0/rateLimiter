export const getPrivate = async (req, res) => {
    res.status(200).json(req.userId);
}