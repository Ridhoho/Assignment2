const Bookmark = require('../models/Bookmark')
const Movie = require('../models/Movie')

const getMyBookmark = async (req, res, next) => {
    try{
        const bookmarks = await Bookmark.findAll({
            where: { userId: req.user.id},
            include: [Movie]
        })

        return res.status(200).json({
            success: true,
            message: "Bookmark berhasil ditampilkan",
            data: bookmarks
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {getMyBookmark}