import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

import { Map } from "./Map";

import { withMargins } from "../utils";

import paperClipIcon from '../img/paper-clip.svg';
import trashIcon from '../img/trash.svg';


const override = `
    display: block;
    margin: 30px 0;
    text-align: center;
`;
const initialData = {
    city: {},
    customer: '',
    company: '',
    phone: '',
    email: '',
    pickpoint: {},
    address: '',
    comment: '',
    paymentType: 'online',
    deliveryType: 'pickup'
};


export const Delivery = ({
                             cart,
                             citiesSuggestions,
                             handleGetCitiesSuggestions,
                             pickpoints,
                             handleGetPickpoints,
                             handleAddFile,
                             handleDeleteFile,
                             deliveryPrice,
                             handleCalculateDelivery,
                             orderWasCreated,
                             handleCreateOrder,
                         }) => {
    const cartId = cart.id;

    const [data, setData] = useState(initialData);

    const [searchString, setSearchString] = useState('');

    const handleChange = (name, value) => {

        if (name === 'city' || name === 'deliveryType') {
            let deliveryType = data.deliveryType;
            let cityCode = data.city.code;

            if (name === 'city') {
                cityCode = value.code;
            } else if (name === 'deliveryType') {
                deliveryType = value;
            }

            if (cityCode) {
                handleCalculateDelivery({
                    cityCode,
                    deliveryType,
                    insurance: cart.items_cost,
                    ...cart.package
                });
                handleGetPickpoints(cityCode);
            }
        }

        setData({...data, [name]: value});
    }

    const onChangeCityField = (e) => {
        const value = e.target.value;

        if (data.city.id) {
            handleChange('city', initialData.city);
        }

        setSearchString(value);

        if (value.length !== 0) {
            handleGetCitiesSuggestions(value);
        }
    }

    const handleChooseCity = (cityId) => {
        const city = citiesSuggestions.suggestions.find(city => city.id === cityId);
        const cityCode = city.code;

        if (data.deliveryType === 'pickup') {
            handleGetPickpoints(cityCode);
        }

        handleChange('city', city);

        setSearchString('');
    }

    const handleChangePickpoint = (e) => {
        const pickpointId = e.target.value;
        handleChange('pickpoint', pickpoints.find(pickpoint => pickpoint.id === pickpointId));
    }

    const handleUploadFile = (e) => {
        const file = e.target.files[0];
        handleAddFile({file, cartId});
    }

    const onDeleteFile = (fileId) => {
        handleDeleteFile({fileId, cartId});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        handleCreateOrder({...data, cartId, deliveryPrice});
    }

    const getCityPublicName = (city) => {
        let result = `${city.name}, ${city.sub_region}, ${city.region}`;

        if (city.name === city.sub_region || !city.sub_region) {
            result = `${city.name}, ${city.region}`;
        }

        if (city.name === city.region) {
            result = city.name;
        }

        return result;
    }

    return (
        <section className="delivery main__delivery">
            <div className="wrapper">
                <h2 className="title2">Доставка</h2>
                <form className="delivery__form" onSubmit={onSubmit}>
                    <div className="delivery__group">
                        <input
                            className="form-radio"
                            type="radio"
                            id="courier"
                            checked={data.deliveryType === 'courier'}
                            onChange={() => handleChange('deliveryType', 'courier')}
                        />
                        <label className="form-btn delivery__btn" htmlFor="courier">Курьером</label>

                        <input
                            className="form-radio"
                            type="radio"
                            id="pickup"
                            checked={data.deliveryType === 'pickup'}
                            onChange={() => handleChange('deliveryType', 'pickup')}
                        />
                        <label className="form-btn delivery__btn" htmlFor="pickup">Самовывоз</label>
                    </div>
                    <div className="delivery__group delivery__group_mobile_full">
                        <label className="delivery__label">
                            <div className="delivery__name">ФИО *</div>
                            <input
                                type="text"
                                className="form-field delivery__field"
                                value={data.customer}
                                onChange={(e) => handleChange('customer', e.target.value)}
                                required
                            />
                        </label>
                        <label className="delivery__label">
                            <div className="delivery__name">Компания</div>
                            <input
                                type="text"
                                className="form-field delivery__field"
                                value={data.company}
                                onChange={(e) => handleChange('company', e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="delivery__group delivery__group_mobile_full">
                        <label className="delivery__label">
                            <div className="delivery__name">Телефон *</div>
                            <input
                                type="text"
                                className="form-field delivery__field"
                                value={data.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                required
                            />
                        </label>
                        <label className="delivery__label">
                            <div className="delivery__name">E-mail *</div>
                            <input
                                type="email"
                                className="form-field delivery__field"
                                value={data.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="delivery__group delivery__group_mobile_full">
                        <label className="delivery__label">
                            <div className="delivery__name">Город</div>
                            <input
                                type="text"
                                className="form-field delivery__field"
                                value={data.city.id ? getCityPublicName(data.city) : searchString}
                                onChange={onChangeCityField}
                            />
                            {citiesSuggestions && searchString.length !== 0 && (
                                <div className="delivery__suggestions">
                                    {citiesSuggestions.isLoading ? (
                                        <BeatLoader loading={true} css={override} size={10} margin={2}/>
                                    ) : citiesSuggestions.suggestions.length !== 0 ? citiesSuggestions.suggestions.map(city => (
                                        <p key={city.id} onClick={() => handleChooseCity(city.id)}>
                                            {getCityPublicName(city)}
                                        </p>
                                    )) : (
                                        <p>Совпадения не найдены</p>
                                    )}
                                </div>
                            )}
                        </label>
                        {data.deliveryType === 'pickup' ? pickpoints.length !== 0 && (
                            <label className="delivery__label">
                                <div className="delivery__name">Пункт выдачи</div>
                                <select
                                    className="form-field delivery__field"
                                    defaultValue=""
                                    value={data.pickpoint.id}
                                    onChange={handleChangePickpoint}
                                >
                                    <option value="" disabled>Выберите пункт выдачи</option>
                                    {pickpoints.map(pickpoint => (
                                        <option value={pickpoint.id} key={pickpoint.id}>
                                            {pickpoint.name}, {pickpoint.address}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        ) : (
                            <label className="delivery__label">
                                <div className="delivery__name">Адрес</div>
                                <input
                                    type="text"
                                    className="form-field delivery__field"
                                    value={data.address}
                                    onChange={(e) => handleChange('address', e.target.value)}
                                />
                            </label>
                        )}
                    </div>
                    {data.deliveryType === 'pickup' && pickpoints && (
                        <Map
                            cityLat={data.city.latitude}
                            cityLng={data.city.longitude}
                            pickpoints={pickpoints}
                            handleChange={handleChange}
                        />
                    )}
                    <div className="delivery__name">Оплата</div>
                    <div className="delivery__group delivery__group_mobile_full">
                        <input
                            className="form-radio"
                            type="radio"
                            id="online"
                            checked={data.paymentType === 'online'}
                            onChange={() => handleChange('paymentType', 'online')}
                        />
                        <label className="form-btn delivery__btn" htmlFor="online">Онлайн картой</label>

                        <input
                            className="form-radio"
                            type="radio"
                            id="invoice"
                            checked={data.paymentType === 'invoice'}
                            onChange={() => handleChange('paymentType', 'invoice')}
                        />
                        <label className="form-btn delivery__btn" htmlFor="invoice">По счету для юр. лица</label>
                    </div>
                    <div className="delivery__group">
                        <label htmlFor="" className="delivery__label">
                            <div className="delivery__name">Комментарий</div>
                            <input
                                type="text"
                                className="form-field delivery__field"
                                value={data.comment}
                                onChange={(e) => handleChange('comment', e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="delivery__group delivery__group_mobile_full">
                        <div className="delivery__label">
                            <div className="delivery__name">Прикрепить файлы/макеты</div>
                            <div className="file-field">
                                <input
                                    type="file"
                                    className="file-field__input"
                                    id="file-design"
                                    onChange={handleUploadFile}
                                />
                                <label className="file-field__label delivery__file-label" htmlFor="file-design">
                                    Прикрепить
                                </label>

                                <div className="file-field__names">
                                    {cart.files.map(file => (
                                        <div className="file-field__file" key={file.id}>
                                            <img src={paperClipIcon} alt=""/>
                                            <p>{file.name}</p>
                                            <img
                                                src={trashIcon}
                                                onClick={() => onDeleteFile(file.id)}
                                                className="file-field__file-delete"
                                                alt=""
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="delivery__label">
                            <div className="delivery__name">Прикрепить реквизиты</div>
                            <div className="file-field">
                                <input
                                    type="file"
                                    className="file-field__input"
                                    id="file-requisite"
                                    onChange={handleUploadFile}
                                />
                                <label className="file-field__label delivery__file-label" htmlFor="file-requisite">
                                    Прикрепить
                                </label>
                            </div>
                        </div>
                    </div>
                    {deliveryPrice && (
                        <div className="delivery__total">
                            <h2 className="title2 delivery__total-title">Итого:</h2>
                            <div className="text delivery__text">Сумма без доставки: <span className="delivery__value">
                                {withMargins(cart.items_cost)} ₽</span>
                            </div>
                            <div className="text delivery__text">Стоимость доставки: <span className="delivery__value">
                                {withMargins(deliveryPrice)} ₽</span>
                            </div>
                            <p className="text delivery__text">Всего: <span className="delivery__total-value">
                                {withMargins(+cart.items_cost + +deliveryPrice)} ₽</span>
                            </p>
                        </div>
                    )}
                    {orderWasCreated === false && (
                        <p>Ошибка создания заказа. Попробуйте ещё раз.</p>
                    )}
                    <button className="btn delivery__submit">Оформить заказ</button>
                </form>
            </div>
        </section>
    );
}