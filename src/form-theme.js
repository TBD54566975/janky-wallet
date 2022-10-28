import { AbstractTheme } from '@json-editor/json-editor/src/theme';

const options = {
  disable_theme_rules  : false, // Disable creation of Inline Style Rules
  label_bold           : false, // Element labels bold 
  object_panel_default : true,  // Indicates whether to use rules as default or alternate style
  object_indent        : true,  // Indent nested object elements
  object_border        : false, // Add border around object elements
  table_border         : false, // Add border to array "table" row and cells
  table_hdiv           : false, // Add bottom-border to array "table" cells
  table_zebrastyle     : false, // Add "zebra style" to array "table" rows
  input_size           : 'small', // Size of input and select elements. "small", "normal", "large"
  enable_compact       : false
};

export class FormTheme extends AbstractTheme {
  constructor (jsonEditor) {
    super(jsonEditor, options);
  }

  getFormInputLabel (text, req) {
    const el = document.createElement('label');
    el.appendChild(document.createTextNode(text));
    
    if (req) {
      el.classList.add('required', 'bg-yellow-300');
    }
    
    return el;
  }
}