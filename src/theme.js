import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';

export const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink, // Indigo is probably a good match with pink
  },
});
