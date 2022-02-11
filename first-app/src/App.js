import logo from './logo.svg';
import './App.css';
import JQ from 'jquery'
import Header from './Header'
import Button from '@mui/material/Button';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import ContactlessIcon from '@mui/icons-material/Contactless';
import DataList from './DataList';

function App() {
  const name = "asfsdjh"

  function onBtnClick(event) {
    console.log(event, "eve")
    JQ.ajax({
      url: "https://www.npmjs.com/package/@mui/material", success: (response) => {
        console.log(response)
      }, error: () => {
        alert("error")
      }
    })
  }
  return (
    <div>
      <Header
        onLoaded={(value) => {
          console.log("val", value)
        }}
        logoSrc="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
      />
      <div className="green-text">
        Hello world
      </div>
      <div>
        line two
      </div>
      <Button
        endIcon={<AirlineSeatReclineExtraIcon />}
        startIcon={<ContactlessIcon />}
        onClick={alert}
        variant="outlined"
        color="success"
        style={{ height: 50 }} >
        Mui button
      </Button>

      <DataList/>

    </div>
  );
}

export default App;
