import { withMargins } from "../utils";


export const Cart = ({cart}) => {

    return (
        <section className="cart main__cart">
            <div className="wrapper">
                <h1 className="title1">Оформление заказа</h1>
                <div className="cart__header">
                    <div className="cart__name">Наименование</div>
                    <div className="cart__value">Количество</div>
                    <div className="cart__value">Цена за ед.</div>
                    <div className="cart__value">Стоимость</div>
                </div>
                <div className="cart__list">
                    {cart.items.map(item => (
                        <div className="cart__item" key={item.id}>
                            <img src="images/product.png" alt="" className="cart__img"/>
                            <div className="text cart__name">{item.name}</div>
                            <div className="text cart__value cart__value_count">
                                <span className="cart__mobile-text">Количество: </span>{item.amount}
                            </div>
                            <div className="text cart__value">
                                <span className="cart__mobile-text">Цена за ед.: </span>{withMargins(item.price)} ₽
                            </div>
                            <div className="text cart__value">
                                <span className="cart__mobile-text">Стоимость: </span>{withMargins(item.sum)} ₽
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text cart__total">
                    Итого: <span className="cart__total-value">{withMargins(cart.items_cost)} ₽</span>
                </div>
            </div>
        </section>
    );
}