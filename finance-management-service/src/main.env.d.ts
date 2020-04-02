interface User {
  id: string;
  password: string;
  age: string;
  name: {
    first: string;
    last: string;
  };
  company: string;
  email: string;
}
