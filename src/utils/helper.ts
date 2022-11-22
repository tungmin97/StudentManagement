import Toast from 'react-native-toast-message';

export const formatAge = (num: number | string) => String(num).slice(0, 2);

export const validateAge = (input: number) => {
  if (input <= 0 || input >= 100) {
    Toast.show({
      type: 'error',
      text1: 'Age must be between 0 and 100',
    });
  } else {
    Toast.show({
      type: 'success',
      text1: 'Field is valid',
    });
  }
};

export const validateEmail = (input: string) => {
  const pattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!input.trim() && pattern.test(input)) {
    Toast.show({
      type: 'success',
      text1: 'Email is valid',
    });
  }
  Toast.show({
    type: 'error',
    text1: 'Email is invalid',
  });
};

export const validateField = (input: string) => {
  if (input.length < 3) {
    Toast.show({
      type: 'error',
      text1: 'Field is required and must be longer than 3 characters',
    });
  } else {
    Toast.show({
      type: 'success',
      text1: 'Field is valid',
    });
  }
};

export const imgData = [
  {
    id: 1,
    url: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png',
  },
  {
    id: 2,
    url: 'https://w7.pngwing.com/pngs/943/762/png-transparent-waiter-computer-icons-avatar-flat-avatars-food-heroes-logo-thumbnail.png',
  },
  {
    id: 3,
    url: 'https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png',
  },
];
