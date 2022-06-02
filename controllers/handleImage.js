const handleImage = (req, res, db, bcrypt) => {
    const { id } = req.body;
    db('users').where('id','=',id)
    .increment('enteries', 1)
    .returning('enteries')
    .then(enteries => {
        res.json(enteries[0].enteries);
    })
    .catch (err => res.status(400).json('unable to get entries'))
}
module.exports = {handleImage: handleImage}