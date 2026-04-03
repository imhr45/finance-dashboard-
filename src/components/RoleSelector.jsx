import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const RoleSelector = () => {

  const { role, setRole } =
    useContext(AppContext);

  return (

    <select
      value={role}
      onChange={(e) =>
        setRole(e.target.value)
      }
      className="border p-2 rounded"
    >

      <option value="viewer">
        Viewer
      </option>

      <option value="admin">
        Admin
      </option>

    </select>

  );
};

export default RoleSelector;