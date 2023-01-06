import React from "react";

//Genral card in order to display both Metircs and Posts Component on the same page (Dashboard).
const DashboardCard = ({comp}) => {
    return (
        <div>
           <div>{ comp }</div> 
        </div>
    )
}

export default DashboardCard;