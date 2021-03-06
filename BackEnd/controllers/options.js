const Options = require('../model/Options')
const {robot} = require('../model/robot/Robot')

var changeSchedule = async function (req, res) {
  await Options.setScheduleTime(req.body.hour, req.body.min)
  // Refresh Retrieve Robot to the new time
  robot.updateRetrieveJobsSchelude()
  res.json(true)
}

var getSchedule = async function (req, res) {
  const optionsValues = await Options.getOptions()
  res.json(optionsValues)
}

var getOrthancServer = function (req, res) {
  const orthancSettings = Options.getOrthancConnexionSettings()
  res.json(orthancSettings)
}

var setOrthancServer = function (req, res) {
  const data = req.body
  Options.setOrthancConnexionSettings(data.OrthancAddress, data.OrthancPort, data.OrthancUsername, data.OrthancPassword)
  res.end()
}

module.exports = { changeSchedule, getSchedule, getOrthancServer, setOrthancServer }
