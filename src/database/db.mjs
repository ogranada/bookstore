export const data = [
  {
    "name": "Foundation",
    "authors": [
      {
        "name": "Isaac",
        "lastname": "Asimov"
      }
    ]
  },
  {
    "name": "Harry Potter and the phylosopher stone",
    "authors": [
      {
        "name": "J. K.",
        "lastname": "Rowling"
      }
    ]
  }
];

export const users = [
  {
    name: 'Ulises',
    lastname: 'Cuñe',
    username: 'ucune',
    password: 'Mimamamemima123*',
    email: 'ucune@gmail.com',
    rol: 'customer'
  },
  {
    name: 'Ezequiel',
    lastname: 'Rivas',
    username: 'erivas',
    password: 'Memimamimama123*',
    email: 'erivas@gmail.com',
    rol: 'admin'
  }
];

export async function validateUser(username, password) {
  return users.find((user) => {
    if (user.username === username && user.password === password) {
      return true;
    } else {
      return false;
    }
  });
}
