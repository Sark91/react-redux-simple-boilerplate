import { Map } from 'immutable';

export const initialState = new Map({
  $globalPadding: '24px',

  '.ContainerTemplate': {
    border: '1px solid red',
  },

  '.InputContainer': {
    border: '1px solid blue',

    input: {
      color: 'red',
      width: 'calc(100% - $globalPadding)',
    }
  },


  '@media (max-width: $screenSmall)': {
    '.Container': {
      width: '100%',
    }
  },

  '.Container': {
    '@media (max-width: $screenLarge)': {
      width: '1200px',
    }
  }

});

/*
  ".ContainerTemplate": {
    border: '1px solid red',
  },

  ".InputContainer": {
    border: '1px solid blue',
  }

  ".InputContainer input": {
    color: 'red',
    width: 'calc(100% - $globalPadding)',
  }
 */
/*
 '@media (min-width: $screenSmall)': {
   '.Container': {
     width: '100%'
   }
 }

 '@media (max-width: $screenLarge)': {
   '.Container': {
     width: '1200px'
   }
 }
 */