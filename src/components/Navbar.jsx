import RoleSelector from "./RoleSelector";

const Navbar = () => {

  return (

    <div className="bg-white shadow p-4 flex justify-between items-center">

      <h1 className="text-xl font-bold">
        Finance Dashboard
      </h1>

      <RoleSelector />

    </div>

  );
};

export default Navbar;