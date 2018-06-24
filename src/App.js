import React, { Component } from 'react';
import './assets/App.css';
import {connect} from 'react-redux'
import {filterObject, getDayName} from './utils/helpers'
import ReactTable from "react-table";
import {fetchLocations, fetchUsers, fetchPunches} from './actions'

class App extends Component {

    componentDidMount(){

        this.props.fetchLocations("locations.json");
        this.props.fetchUsers("users.json");
        this.props.fetchPunches("timePunches.json");

    }

    render() {
        const {locations, users, punches} = this.props;
        const rows = [];
        let userTimePunches;

        //Loop through locations
        if(locations){
            locations.map((location) =>{

                //Loop through users
                if(users){
                    users.map( item => filterObject(item).map((user) => {

                        //Checks if user worked for a specific location
                        if(user.locationId === location.id){

                            //Loop through time punches for each user
                            userTimePunches = punches.reduce(function(filtered, time) {
                                if (time.userId === user.id) {

                                    let dateIn = new Date(time.clockedIn);
                                    let dateOut = new Date(time.clockedOut);

                                    let timeDataDay;
                                    let timeDataOtherDay;

                                    //Checks entry is in different days
                                    if(dateIn.getDate() === dateOut.getDate()){

                                        timeDataDay = {
                                            userId: user.id,
                                            day: dateIn.getDate(),
                                            dayName: getDayName(dateIn.getDay()),
                                            dayHours: dateIn.getHours(),
                                            overpaid: (dateIn.getHours() > (location.labourSettings.dailyOvertimeThreshold/60) ? true : false),
                                            overtime: (dateIn.getHours() > (location.labourSettings.dailyOvertimeThreshold/60) ?  (dateIn.getHours()-(location.labourSettings.dailyOvertimeThreshold/60)): false),
                                        };
                                        filtered.push(timeDataDay);

                                    }else{

                                        //They are in different days
                                        timeDataDay = {
                                            userId: user.id,
                                            day:dateIn.getDate(),
                                            dayName: getDayName(dateIn.getDay()),
                                            dayHours: 24 - dateIn.getHours(),
                                            overpaid: ((24-dateIn.getHours()) > (location.labourSettings.dailyOvertimeThreshold/60) ? ((24-dateIn.getHours())-(location.labourSettings.dailyOvertimeThreshold/60)) : false),
                                            overtime: ((24-dateIn.getHours()) > (location.labourSettings.dailyOvertimeThreshold/60) ?  (dateIn.getHours()-(location.labourSettings.dailyOvertimeThreshold/60)): false),
                                        };

                                        timeDataOtherDay = {
                                            userId: user.id,
                                            day: dateOut.getDate(),
                                            dayNumber: dateOut.getDay(),
                                            dayName: getDayName(dateOut.getDay()),
                                            dayHours: dateOut.getHours(),
                                            overpaid: (dateOut.getHours() > (location.labourSettings.dailyOvertimeThreshold/60) ? (dateOut.getHours()-(location.labourSettings.dailyOvertimeThreshold/60)) : false),
                                            overtime: (dateOut.getHours() > (location.labourSettings.dailyOvertimeThreshold/60) ?  (dateOut.getHours()-(location.labourSettings.dailyOvertimeThreshold/60)): false),
                                        };
                                        filtered.push(timeDataDay);
                                        filtered.push(timeDataOtherDay);
                                }
                            }
                                return filtered;
                            }, []);


                            //Array with information about users punches
                            if(userTimePunches.length > 0){

                                // console.log('userTime',userTimePunches);

                                let overtime = 0;
                                let workedhours = 0;

                                userTimePunches.map((item) => {
                                    if(item.overpaid || item.dayName =='Saturday' || item.dayName == 'Sunday')
                                        overtime += item.overtime;

                                    if(!isNaN(item.dayHours)){
                                        workedhours += item.dayHours;
                                    }
                                });

                                rows.push({
                                    picture: user.photo,
                                    name: user.firstName + ' ' + user.lastName,
                                    workedHours:workedhours,
                                    overtimeHours: overtime,
                                 });
                            }
                        }
                    }));
                }

            })
        }

        //Filter all object returned by Store and then create an object that will be displayed
        console.log('locations',locations);



        console.log('ROWS',rows);

        const columns = [{
            Header: 'Picture',
            accessor: 'picture',
            Cell: row => (
                <img src={row.value} alt=''/>
            )
        },{
            Header: 'Name',
            accessor: 'name' // String-based value accessors!
        },{
            Header: 'Worked Hours',
            accessor: 'workedHours'
        }, {
            Header: 'Overtime Hours',
            accessor: 'overtimeHours'
        }];

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Users hours</h1>
                </header>

                {locations && locations.map((location) => (

                    <div key={0}>
                        <h2>{location.address}</h2>
                        <ReactTable
                            data={rows}
                            columns={columns}
                        />
                        <br />
                    </div>

                ))}

            </div>
        );
    }
}

function mapStateToProps(state){
    console.log("STATE", state);
    return{
        locations: filterObject(state.locations),
        users:filterObject(state.users).map( (items) => filterObject(items).map((elem) => elem)),
        punches:filterObject(state.punches)
    }

}

function mapDispatchToProps(dispatch){
    return {
        fetchLocations: (url) => dispatch(fetchLocations(url)),
        fetchUsers: (url) => dispatch(fetchUsers(url)),
        fetchPunches: (url) => dispatch(fetchPunches(url)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
