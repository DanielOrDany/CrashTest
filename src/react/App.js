import React from 'react';
import './App.css';
import { getAllTests } from './methods';
import 'bootstrap/dist/css/bootstrap.min.css';
import home_icon from "./home_white_24dp.svg";
import vector_icon from "./vector.svg";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSignedIn: true
        };
    };

    async componentDidMount() {
      const tests = await getAllTests();

      console.log("tests", tests);

      this.setState({
          tests: tests
      })
    }


    render() {
        const {
            tests
        } = this.state;

        return (
            <div className="App">
                <header>
                    <div className="home-icon">
                        <img src={home_icon} alt="Home icon"/>
                    </div>
                </header>
                <div className="body">                    
                    <div className="page-title">
                    </div>
                    <div className="tests-list">
                        <div className="flex-container-1">                
                            Tests
                            <div> </div>
                            <div> </div>
                            <div> </div>
                            <div> </div>
                        <div className="button">
                        <button className="button">
                            Add test
                        </button>
                        </div>
                        
                    </div> 
                        <div className="flex-container">
                            <table>
                                <thead>
                                <tr>
                                           <th> Name</th> 
                                           <th>IP</th>
                                           <th>ID</th>
                                           <th>Created at</th>
                                           </tr>
                                           </thead>
                                           </table>
                                           </div>
    {
                            tests && tests.map(test => {
                               return (
                                   <div>     
                                          <div className="flex-container0"> 
                                       <table> 
                                           <tr>
                                   <table className="vector-icon">
                                       <img src={vector_icon} alt="Vector"/>
                                   </table>    
                                       <td>{test.name}</td>                                   
                                       <td>{test.ip}</td>                                       
                                       <td>{test.id}</td>                                      
                                       <td>{new Date(test.created_at).toLocaleString()}</td>
                                   </tr>
                                       </table>
                                   </div>
                                   </div> 
                               );
                            })
                        }
                    </div>
                </div>
                <footer>
                    <div className="footer-text">
                    Rows per page: 10
                    </div>
                </footer>
            </div>
        );
    }
}

export default App;
