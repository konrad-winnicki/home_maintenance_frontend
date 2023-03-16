import React from "react";
class AddFinishedProductsToCart extends React.Component {
    
  
  
    render() {
      return (
        <button
          className="btn btn-warning btn-sm"
          disabled={this.props.app_state !== "default" ? true : false}
          onClick={() => {
            this.props.state_changer({ app_state: "adding_finished_products"})            
            
            
          }}
        >
          Add to shopping list
        </button>
      );
    }
  }

  export default AddFinishedProductsToCart