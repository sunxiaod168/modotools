// ID	PlanInstallDate	PlanFinishDate	InstallDate	FinishDate	IsFinished	Leader	CreateTime	CreateStaff	Memo	DeliveryID	Reporter	ReportTime	ReportContent


const Fields = [{
    name: 'ID',
    type: 'number'
  },
  {
    name: 'PlanInstallDate',
    type: 'string'
  },
  {
    name: 'PlanFinishDate',
    type: 'string'
  },
  {
    name: 'InstallDate',
    type: 'string'
  },
  {
    name: 'FinishDate',
    type: 'string'
  },
  {
    name: 'IsFinished',
    type: 'number'
  },
  {
    name: 'Leader',
    type: 'number'
  },
  {
    name: 'CreateTime',
    type: 'string'
  },
  {
    name: 'CreateStaff',
    type: 'number'
  },
  {
    name: 'Memo',
    type: 'string'
  },
  {
    name: 'DeliveryID',
    type: 'number'
  },
  {
    name: 'Reporter',
    type: 'number'
  },
  {
    name: 'ReportTime',
    type: 'string'
  },
  {
    name: 'ReportContent',
    type: 'string'
  }  
];
const FieldsMapping = {
    'ID':'ID',
    'PlanInstallDate':'PlanInstallDate',
    'PlanFinishDate':'PlanFinishDate',
    'InstallDate':'InstallDate',
    'FinishDate':'FinishDate',
    'IsFinished':'IsFinished',
    'Leader':'Leader',
    'CreateTime':'CreateTime',
    'CreateStaff':'CreateStaff',
    'Memo':'Memo',
    'DeliveryID':'DeliveryID',
    'Reporter':'Reporter',
    'ReportTime':'ReportTime',
    'ReportContent':'ReportContent'
};
const insertSQL = require('./insertSQL');

var makeInsert = function (data, fileName) {

  insertSQL(data, fileName, 'InstallDispatchHeader', Fields, FieldsMapping, null, true);
}

module.exports.makeInsert = makeInsert;