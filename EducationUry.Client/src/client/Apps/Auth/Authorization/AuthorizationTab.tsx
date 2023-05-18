
import {observer} from "mobx-react-lite";
import * as React from "react";
import {AuthTab, Store} from "../Store";

export const AuthorizationTab = observer((props: {
    store: Store
}) => {
    const store = props.store.authStore;

	return <>
                <div className="v-form__title">Вход через почту</div>
                <p><span>или</span> <span className="t-link-inline" onClick={() => props.store.setTab(AuthTab.Registration)}><span>зарегистрироваться</span></span></p>

                <label data-v-4b8ffc2e="" className="v-form-input v-form-input--invalid">
                	<div className="ui-limited-input" data-length="2048">
                		<input
                			type="email"
                			pattern=".{0,2048}"
                			name="login"
                			value={store.email}
                			onChange={e => store.email = e.target.value}
                			placeholder="Почта" minLength={0} maxLength={2048} data-processed="true"/>
                	</div>
                </label>
                <label data-v-4b8ffc2e="" className="v-form-input v-form-input--invalid">
                	<div className="ui-limited-input" data-length="2048">
                		<input
                			style={{paddingLeft: '10px'}}
                			type="password"
                			pattern=".{0,2048}"
                			value={store.password}
                			onChange={e => store.password = e.target.value}
                			name="password" placeholder="Пароль" minLength={0} maxLength={2048} data-processed="true"/>
                	</div>
                </label>

			{store.userError && <span style={{
				color: '#e73131',
    			textAlign: 'center',
    			display: 'block',
				marginTop: '25px'
			}}>{store.userError}</span>}

                <div className="v-form__footer">
                	<button onClick={() => store.login()} data-layout-mobile="icon,label" data-layout-desktop="icon,label" className={`v-button v-button--blue v-button--size-default v-button${store.isValid ? '' : '--disabled'}`}>
                		<span className="v-button__label">Войти</span>
                	</button>
                	<span className="auth-email-recover">
                		<span>Я забыл пароль</span>
                	</span>
                </div>
	</>
});
