export const OrderSuccess = () => {

    return (
        <section className="order-success">
            <div className="wrapper">
                <div className="order-success__content">
                    <img src="images/icons/tick.svg" alt="" className="order-success__icon"/>
                        <h1 className="title1 order-success__title1">Ваш заказ оформлен!</h1>
                        <p className="text order-success__text">Ваш заказ успешно оформлен. Мы свяжемся с Вами в
                            ближайшее время.</p>
                        <a href="/" className="btn order-success__btn">На главную</a>
                </div>
            </div>
        </section>
    );
}