import React from "react";
import ProductComponent from "./ProductComponent";
import styles from "../my-style.module.css";

class ProductList extends React.Component {
    render() {
      let header_name;
      if (this.props.active_component === "Store_component") {
        header_name = "Products at home";
      }
      if (this.props.active_component === "Cart_component") {
        header_name = "Shopping list";
      }
      return (
        <div>
          <div className={styles.header}>{header_name}</div>
          {this.props.product_list.map((product) => (
            <div key={product.product_id} className={styles.product_row}>
              <ProductComponent
                active_component={this.props.active_component}
                product={product}
                change_properties_in_db={this.props.change_properties_in_db}
                app_state={this.props.app_state}
                delete_function={this.props.delete_function}
                state_changer={this.props.state_changer}
                session_code={this.props.session_code}
                server_response_service={this.props.server_response_service}
              ></ProductComponent>
            </div>
          ))}
        </div>
      );
    }
  }

  export default ProductList