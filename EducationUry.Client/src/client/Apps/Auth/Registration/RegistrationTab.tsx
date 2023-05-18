
import {observer} from "mobx-react-lite";
import * as React from "react";
import {AuthTab, Store} from "../Store";

export const RegistrationTab = observer((props: {
    store: Store
}) => {
    const store = props.store.regStore;

	return <>
            <div className="v-form__title">Регистрация</div>

			{!store.showFinishRegistration && <>
            {!store.showCodePage && 
            <>
                <p><span>или</span> <span className="t-link-inline" onClick={() => props.store.setTab(AuthTab.Auth)}><span>авторизоваться</span></span></p>
                     
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
                     
                <p style={{marginTop: '30px'}}>Мы отправим вам на почту код подтверждения, который нужно будет ввести<span></span></p>
                     
                <div className="v-form__footer">
                	<button onClick={() => store.sendSecretCode()} data-layout-mobile="icon,label" data-layout-desktop="icon,label" className={`v-button v-button--blue v-button--size-default v-button${store.isValid ? '' : '--disabled'}`}>
                		<span className="v-button__label">Продолжить</span>
                	</button>
                </div>
            </>}

            {store.showCodePage && 
            <>
            <p style={{marginBottom: '15px'}}>Вам на почту был отправлен код подтверждения<span></span></p>
			<div className="v-form-input v-form-input--invalid" style={{margin: '0px auto', display: "table"}}>
				<input
					ref={store.secretCodeRef1}
					className='input-secret-code'
					type="login"
					pattern=".{0,1}"
					value={store.code[0]}
					onChange={e => store.writeCode(e.target.value, 0)}
					minLength={1} maxLength={1}/>
				<input
					ref={store.secretCodeRef2}
					className='input-secret-code'
					type="login"
					pattern=".{0,1}"
					value={store.code[1]}
					onChange={e => store.writeCode(e.target.value, 1)}
					minLength={1} maxLength={1}/>
				<input
					ref={store.secretCodeRef3}
					className='input-secret-code'
					type="login"
					pattern=".{0,1}"
					value={store.code[2]}
					onChange={e => store.writeCode(e.target.value, 2)}
					minLength={1} maxLength={1}/>
				<input
					ref={store.secretCodeRef4}
					className='input-secret-code'
					type="login"
					pattern=".{0,1}"
					value={store.code[3]}
					onChange={e => store.writeCode(e.target.value, 3)}
					minLength={1} maxLength={1}/>
			</div>
			<div style={{
				textAlign: 'center',
				marginTop: '10px'
			}}>
				Ключ истечет через: <span style={{
				color: '#000',
				fontWeight: 500,
				marginLeft: '3px'
			}}>{store.expiredDateTime}</span>
			</div>
                <div className="v-form__footer">
                	<button onClick={() => store.verifySecretCode()} data-layout-mobile="icon,label" data-layout-desktop="icon,label" className={`v-button v-button--blue v-button--size-default v-button`}>
                		<span className="v-button__label">Продолжить</span>
                	</button>
                </div>
            </>}
			</>}
			{store.showFinishRegistration && <>
                     
                <p style={{marginTop: '30px'}}>Вы зарегестрировались в <span style={{color: '#8f8f8f', fontWeight: 500}}><span style={{color: '#c52a2a'}}>Go</span>Ads</span><span></span>. Для авторизации необходимо перейти на страницу авторизации</p>
                     
                <div className="v-form__footer">
                	<button onClick={() => props.store.setTab(AuthTab.Auth)} data-layout-mobile="icon,label" data-layout-desktop="icon,label" className={`v-button v-button--blue v-button--size-default v-button`}>
                		<span className="v-button__label">К авторизации</span>
                	</button>
                </div>
			</>}

			 {store.responseError && <span style={{
				textAlign: 'center',
  				display: 'block',
  				color: '#ff3636',
  				marginBottom: '30px'
			 }}>{store.responseError}</span>}
	</>
});
