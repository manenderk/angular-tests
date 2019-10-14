export const TableSchema = {
  rowIdColumnName: 'id',
  hideGlobalFilter: false,
  pageSize: 10,
  dateFormat: 'dd/mm/YYYY',
  dateTimeFormat: 'dd/MM/YYYY hh:mm:ss',
  timeFormat: 'hh:mm:ss',
  columnSchema: [
    {
      name: 'id',
      label: 'ID',
      display: true,
      filter: true,
      dataType: 'number'
    },
    {
      name: 'name',
      label: 'Name',
      display: true,
      filter: true,
      dataType: 'string',
    },
    {
      name: 'position',
      label: 'Position',
      display: true,
      filter: true,
      dataType: 'string'
    },
    {
      name: 'office',
      label: 'Office',
      dataType: 'string',
    },
    {
      name: 'ext',
      label: 'Extension',
      dataType: 'string',
    },
    {
      name: 'startDate',
      label: 'Start Date',
      filter: true,
      dataType: 'date',
    },
    {
      name: 'salary',
      label: 'Salary',
      dataType: 'number'
    }
  ]
};
