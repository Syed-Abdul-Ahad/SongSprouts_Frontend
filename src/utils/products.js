export const  getColorStyle = (color) => {
    const colorMap = {
      'Black': '#000000',
      'White': '#FFFFFF',
      'Navy': '#000080',
      'Gray': '#808080',
      'Grey': '#808080',
      'Red': '#FF0000',
      'Blue': '#0000FF',
      'Green': '#008000',
      'Yellow': '#FFFF00',
      'Pink': '#FFC0CB',
      'Purple': '#800080',
      'Orange': '#FFA500',
      'Brown': '#A52A2A',
      'Natural': '#F5F5DC',
      'Beige': '#F5F5DC'
    };
    return colorMap[color] || color;
  };