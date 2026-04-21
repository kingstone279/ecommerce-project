import "./checkout-header.css";
import dayjs from "dayjs";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import "./CheckoutPage.css";
import { formatMoney } from "../utils/money";
import Logo from "../assets/images/logo.png";
import MobileLogo from "../assets/images/mobile-logo.png";
export function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState();
  const [paymentSummary, setPaymentSummary] = useState(null)
  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      });

      axios.get('/api/payment-summary')
      .then((response) => {
        setPaymentSummary(response.data)
      })
  }, []);
  return (
    <>
      <title>Checkout</title>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src={Logo} />
              <img className="mobile-logo" src={MobileLogo} />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/checkout">
              3 items
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {cart.map((cartitem) => {
              const selectedDeliveryOption = deliveryOptions?.find((deliveryOption) => {
                    return deliveryOption.id === cartitem.deliveryOptionId
              })|| {};
              return (
                <div  className="cart-item-container" key={cartitem.productId}>
                  <div className="delivery-date">
                    Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                  </div>

                  <div className="cart-item-details-grid">
                    <img
                      className="product-image"
                      src={cartitem.product.image}
                    />

                    <div className="cart-item-details">
                      <div className="product-name">
                        {cartitem.product.name}
                      </div>
                      <div className="product-price">
                        {formatMoney(cartitem.product.priceCents)}
                      </div>
                      <div className="product-quantity">
                        <span>
                          Quantity:{" "}
                          <span className="quantity-label">
                            {cartitem.quantity}
                          </span>
                        </span>
                        <span className="update-quantity-link link-primary">
                          Update
                        </span>
                        <span className="delete-quantity-link link-primary">
                          Delete
                        </span>
                      </div>
                    </div>

                    <div className="delivery-options">
                      <div className="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      {deliveryOptions.map((deliveryOption) => {
                        let priceString = 'FREE Shipping'
                        if (deliveryOption.priceCents > 0){
                           priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`
                        }
                        return (
                          <div key={deliveryOption.id} className="delivery-option" >
                            <input
                              type="radio"
                              checked={deliveryOption.id === cartitem.deliveryOptionId}
                              className="delivery-option-input"
                              name={`delivery-option-${cartitem.productId}`}
                            />
                            <div>
                              <div className="delivery-option-date">
                                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                              </div>
                              <div className="delivery-option-price">
                                {priceString}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            <div className="payment-summary-row">
              <div>Items ({paymentSummary?.totalItems}):</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary?.productCostCents ?? 0)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary?.shippingCostCents ?? 0)}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary?.totalCostBeforeTaxCents ?? 0)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary?.taxCents ?? 0)}</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary?.totalCostCents ?? 0)}</div>
            </div>

            <button className="place-order-button button-primary">
              Place your order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
