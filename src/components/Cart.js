import { withMargins } from "../utils";

import cartWhite from '../img/card-1-white.png';
import cartBlack from '../img/card-1-black.png';
import cartCustom from '../img/card-1-custom-white.png';
import sticker from '../img/sticker-1.png';
import stickerCustom from '../img/sticker-1-custom.png';
import logo from '../img/taglme_icon.png';


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
                            {item.code === 'CARD-TAGLME-NTAG213-WHITE' && (
                                <img src={cartWhite} alt="" className="cart__img"/>
                            )}
                            {item.code === 'CARD-TAGLME-NTAG213-BLACK' && (
                                <img src={cartBlack} alt="" className="cart__img"/>
                            )}
                            {item.code === 'CARD-NTAG213-CUSTOM' && (
                                <img src={cartCustom} alt="" className="cart__img"/>
                            )}
                            {item.code.includes('STICKER-TAGLME') && (
                                <img src={sticker} alt="" className="cart__img"/>
                            )}
                            {item.code.includes('STICKER-CUSTOM') && (
                                <img src={stickerCustom} alt="" className="cart__img"/>
                            )}
                            {item.code.includes('SUBSCRIPTION') && (
                                <img src={logo} alt="" className="cart__img"/>
                            )}
                            {item.code.includes('SERVICE') && (
                                <img src={logo} alt="" className="cart__img"/>
                            )}
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