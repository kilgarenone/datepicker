import { h, Component, render } from "preact";
import DatePicker from "./Datepicker";

class HelloPreact extends Component {
  render() {
    return <DatePicker label="haha" value="2019-02-11" />;
  }
}

render(<HelloPreact />, document.getElementById("root"));
