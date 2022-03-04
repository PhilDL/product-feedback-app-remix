import { Card, BasicLink } from "~/components/UI";
const CategoriesIndex = () => {
  return (
    <Card className="flex-col gap-7 w-full h-full text-center items-center justify-center">
      <p className="text-gray-500">Here you can manage your Categories.</p>
      <BasicLink to="/admin/categories/create" role="primary">
        Create a new category
      </BasicLink>
    </Card>
  );
};

export default CategoriesIndex;
