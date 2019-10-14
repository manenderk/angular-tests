export const TableSchema = {
  rowIdColumnName: 'id',
  hideGlobalFilter: false,
  pageSize: 10,
  columnSchema: [
    {
      name: 'id',
      label: 'ID',
      display: true,
      filter: true
    },
    {
      name: 'name',
      label: 'Name',
      display: true,
      filter: true
    },
    {
      name: 'position',
      label: 'Position',
      display: true,
      filter: true
    },
    {
      name: 'office',
      label: 'Office',
    },
    {
      name: 'ext',
      label: 'Extension'
    },
    {
      name: 'startDate',
      label: 'Start Date',
      filter: true
    },
    {
      name: 'salary',
      label: 'Salary'
    }
  ]
};
