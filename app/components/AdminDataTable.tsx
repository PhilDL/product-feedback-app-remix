import React from "react";

export type Data = object & {
  [x: string]: any;
};

export type TableField = {
  name: string;
  key: string;
  render: (item: any) => any;
};

export type AdminDataTableProps = {
  datas: Array<Data>;
  fields: TableField[];
  editButtons: (item: any) => any;
  deleteButtons: (item: any) => any;
};

const AdminDataTable: React.FC<AdminDataTableProps> = ({
  datas,
  fields,
  editButtons,
  deleteButtons,
}: AdminDataTableProps) => {
  return (
    <div className="relative rounded-xl overflow-auto bg-gray-300">
      <div className="shadow-sm overflow-scroll my-8">
        <table className="border-collapse table-fixed w-full text-sm">
          <thead>
            <tr>
              {fields.map((field) => (
                <th
                  key={field.key}
                  className="border-b border-gray-500/25 font-medium p-4 pt-0 pb-3 text-gray-700 text-left"
                >
                  {field.name}
                </th>
              ))}
              <th className="border-b border-gray-500/25 font-medium p-4 pt-0 pb-3 text-gray-700 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {datas.map((item) => (
              <tr key={item.id}>
                {fields.map((field) => (
                  <td
                    key={field.key}
                    className="border-b border-gray-500/25 font-medium p-4 pt-0 pb-3 text-gray-700 text-left"
                  >
                    {field.render(item)}
                  </td>
                ))}
                <td className="border-b border-gray-500/25 p-4 text-slate-500 flex justify-between">
                  {editButtons(item)}
                  {deleteButtons(item)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminDataTable;
