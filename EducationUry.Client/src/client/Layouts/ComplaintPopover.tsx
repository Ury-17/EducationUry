import {observer} from "mobx-react-lite";
import * as React from "react";
import {computed, makeObservable, observable} from "mobx";
import {ComplaintType} from "../Shared/Api/Types/ComplaintType";

export class ComplaintStore {
	constructor(private callbackSendComplaint: (entityId: string, type: ComplaintType, message: string | null) => void) {
		makeObservable(this);
	}
	
	@observable
	public complaintTypes: ({name: string, type: ComplaintType})[] = [
		({ name: 'Оскорбление', type: ComplaintType.Insult }),
		({ name: 'Спам', type: ComplaintType.Spam }),
		({ name: 'Вводит в заблуждение', type: ComplaintType.Misleading }),
		({ name: 'Нарушение закона', type: ComplaintType.LawViolation }),
		({ name: 'Нарушение авторских прав', type: ComplaintType.Copyright }),
		({ name: 'Прочее', type: ComplaintType.Other }),
	];
	
	@observable
	public selectedType: ComplaintType | null = null;
	@observable
	public isOpen: boolean = false;
	@observable
	public showList: boolean = false;
	@observable
	public message: string = '';
	
	public changeMessage = (v: string) => {
		this.message = v;
	};
	
	private entityId: string;
	
	public open = (entityId: string) => {
		this.entityId = entityId;
		this.isOpen = true;
	};
	
	public close = () => {
		this.isOpen = false;
		this.entityId = '';
		this.selectedType = null;
	};
	
	public toggleList = () => {
		this.showList = !this.showList;
	};
	
	public selectType = (value: ComplaintType) => {
		this.showList = false;
		this.selectedType = value;
	}
	
	public send = () => {
		this.callbackSendComplaint(this.entityId, this.selectedType!, this.message === '' || this.message === ' ' ? null : this.message);
		this.close();
	};
	
	@computed
	public get selected() {
		return this.complaintTypes.find(c => c.type === this.selectedType) || null;
	}
}

export const ComplaintPopover = observer((props: {
	store: ComplaintStore
}) => {
	if (!props.store.isOpen) {
		return;
	}
	
	return <div className="popup" data-ignore-outside-click="">
		<div className="popup__layout popup__layout--shown"></div>
		<div className="popup__container popup__container--shown">
			<div className="popup__container__window">
				<div className="popup__container__window__tpl"><div className="ui_modal_window ui_modal_window--complain">
					<div className="ui_modal_window__header">
						<p className="ui_modal_window__title">Пожаловаться</p>
						<div className="ui_modal_window__close" air-click="modal_window_close" onClick={() => props.store.close()}>
							<svg className="icon icon--ui_close" width="12" height="12">
								<svg viewBox="0 0 10 10" id="ui_close"><path fill-rule="evenodd" d="M9.096 0L5 4.097.903 0 0 .904 4.096 5 0 9.097.903 10 5 5.904 9.096 10 10 9.097 5.903 5 10 .904z"></path></svg>
							</svg>
						</div>
					</div>
					<div className="ui_modal_window__content">
						<div data-v-0b3d647b="" data-ignore-outside-click="" className="select">
							<div data-v-0b3d647b="" className="select__current" onClick={() => props.store.toggleList()}>
								<span data-v-0b3d647b="" className="select__label">
									{props.store.selectedType === null ? 'Выберите причину' : props.store.selected?.name || ''}
								</span>
								<svg data-v-0b3d647b="" height="16" width="11" className="icon icon--ui_arrow_down">
									<svg viewBox="0 0 18 11" id="ui_arrow_down"><path fill-rule="evenodd" d="M8.109 10.41L.369 2.265a1.377 1.377 0 010-1.876 1.217 1.217 0 011.783 0L9 7.594 15.848.39a1.217 1.217 0 011.783 0 1.377 1.377 0 010 1.876L9.89 10.41c-.246.26-.57.39-.891.39-.322 0-.645-.132-.89-.39h-.001z"></path></svg>
								</svg>
							</div>
							<div data-v-06ea7b0a="" data-v-19329d4a="" className="bubble" arrow-alignment="right" data-dropdown="" style={{display: props.store.showList ? 'block' : 'none'}}>
								<div data-v-06ea7b0a="" className="bubble__container">
									<div data-v-19329d4a="" data-v-06ea7b0a=""></div>
									<div data-v-3c29ab00="" data-v-19329d4a="" data-ignore-scroll-lock="" className="list" data-v-06ea7b0a="" style={{fontSize: '14px'}}>
										<div data-v-754c20ca="" data-v-3c29ab00="" className="dummy"></div>
										{props.store.complaintTypes.map((complaint, idx) => 
										<div data-v-15682870="" data-v-3c29ab00="" className="list__item item" data-key="1_0" key={idx} onClick={() => props.store.selectType(complaint.type)}>
											<span data-v-15682870="" className="item__text">{complaint.name}</span>
										</div>)}
									</div>
								</div>
							</div>
							{props.store.selectedType === ComplaintType.Other &&
							<div style={{
								marginTop: '15px'
							}}>
								<textarea 
									placeholder='Опишите нарушение...'
									value={props.store.message}
									onChange={e => props.store.changeMessage(e.target.value)}
									style={{
										resize: 'none',
										outline: 'none',
										border: '1px solid #dedede',
										width: '100%',
										height: '60px',
										padding: '4px 7px'
									}}/>
							</div>}
						</div>
						
					</div>
					<div className="ui_modal_window__footer l-ta-left">
						<div className={`ui-button ui-button--1 ${props.store.selectedType === null ? 'ui-button--disabled' : ''}`} onClick={() => props.store.send()}>Отправить</div>
					</div>
				</div>
				</div>
			</div>
		</div>
	</div>
});
