import React, { useState, useRef, useEffect } from 'react';

export default function Promote(props) {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: props.title,
                amount: {
                  currency_code: 'BRL',
                  value: props.price * 0.1,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaidFor(true);
          console.log(order);
        },
        onError: err => {
          setError(err);
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, [props.title, props.price]);

  function formatMoney(money) {
    return money ? money.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';
  }

  if (paidFor) {
    return (
      <div>
        <h1>Parabéns! Seu anúncio foi promovido</h1>
      </div>
    );
  }

  return (
    <div>
      {error && <div>
        <h1>Parabéns! Seu anúncio foi promovido</h1>
        </div>
      }
      <h1>
        Promova o anúncio {props.title} por {formatMoney(props.price * 0.1)}
      </h1>
      <div ref={paypalRef} />
    </div>
  );
}