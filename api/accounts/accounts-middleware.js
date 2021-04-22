const accounts = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.name || !req.body.budget) {
    return res.status(400).json({
      message: 'name and budget are required',
    })
  } else if (typeof (req.body.name) !== 'string') {
    return res.status(400).json({
      message: 'name of account must be a string',
    })
  } else if (req.body.name.length < 3 || req.body.name.length > 100) {
    return res.status(400).json({
      message: 'name of account must be between 3 and 100',
    })
  } else if (typeof (req.body.budget) !== 'number') {
    return res.status(400).json({
      message: 'budget of account must be a number'
    })
  } else if (req.body.budget < 0 || req.body.budget > 1000000) {
    return res.status(400).json({
      message: 'budget of account is too large or too small'
    })
  }

  next()
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const trimmedName = req.body.name.trim();
  accounts.getAll()
    .then((accounts) => {
      const foundName = accounts.find((element) => element.name.trim().toLowerCase() === trimmedName.toLowerCase())
      if (foundName) {
        return res.status(400).json({
          message: "that name is taken"
        })
      } else {
        next()
      }
    })
    .catch((err) => {
      next(err)
    })
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  accounts.getById(req.params.id)
    .then((account) => {
      if (account) {
        req.account = account;
        console.log(req.account)
        next();
      } else {
        res.status(404).json({
          message: "account not found",
        })
      }
    })
    .catch((error) => {
      next(error)
    })
}
