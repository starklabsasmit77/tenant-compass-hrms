
import { UserRole } from "@/contexts/UserContext";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RoleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const RoleSelector = ({ value, onChange }: RoleSelectorProps) => {
  const roles: { label: string; value: UserRole }[] = [
    { label: "Employee", value: "employee" },
    { label: "HR Manager", value: "hr" },
    { label: "Accounts Manager", value: "accounts" },
    { label: "Organization Admin", value: "org-admin" },
    { label: "System Administrator", value: "super-admin" },
  ];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Login As</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role.value} value={role.value}>
              {role.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RoleSelector;
