export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  country: string;
  annualSalary: number;
  dateOfJoining: string;
  hireType: string;
  contractType: string;
  contractEndDate: string;
  probationEndDate: string;
  manager: Employee;
  meta?: {
    headerText: string;
  };
}
