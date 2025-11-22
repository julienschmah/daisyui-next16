import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
/* import { colourOptions } from '../data';
 */
const animatedComponents = makeAnimated();

const colourOptions = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'purple', label: 'Purple' },
  { value: 'orange', label: 'Orange' },
];

export default function AnimatedMulti() {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
/*       defaultValue={[colourOptions[4], colourOptions[5]]}
 */      isMulti
      options={colourOptions}
     />
  );
}
