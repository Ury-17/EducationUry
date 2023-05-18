import {observer} from "mobx-react-lite";
import * as React from "react";
import {Store} from "./Store";
import {Button} from "../../Layouts/Button";
import { StudentModel } from "../../Shared/Api/Controllers/ApiStudents";

export const App = observer((props: any) => {
	const store = React.useState(() => new Store())[0];

	return <>
		<div id='page_wrapper' style={{
			paddingTop: '0px', margin: '0px 10px',
		}}>
			<div className='page page--index' style={{gridColumn: 1, gridRow: 1}}>
                {/* <TopBar store={store}/> */}
				<div>
                <input placeholder="Поиск..." value={store.filter} onChange={(e) => store.filter = e.target.value} style={{
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    padding: '7px 14px',
                    outline: 'none',
					marginTop: '7px',
                    width: '100%',
                }}/>
                    <Button onClick={() => store.create()} style={{
                        marginTop: '7px'
                    }}>Добавить</Button>
				</div>
				<div  style={{marginTop: '10px'}}>
					{/* <nav className="profile-tab-menu" style={{width: '100%', display: 'block'}}> */}
					{store.filteredStudents.map((t, m) => <ProjectView store={store} student={t} key={m} onEdit={() => store.beginEdit(t.id)} onArchive={() => store.toArchive(t.id)} canArchive={true}/>)}
					{/* </nav> */}
				</div>
			</div>
		</div>
	</>
});

const ProjectView = observer((props: {
    student: StudentModel
    key: number
    onArchive: () => void
    canArchive: boolean
	onEdit: () => void;
	store: Store
}) => {
    const proj = props.student;

	return <div className='profile-container' key={props.key} style={{boxShadow: '0px 0px 12px -5px #ccc', borderRadius: '5px', marginTop: '10px', padding: `15px 15px 15px 15px`}}>
        <div style={{display:"flex"}}>
            {/* <div style={{marginLeft: '10px', marginTop: 'auto', marginBottom: 'auto'}}><span style={{border: '1px solid #ccc', borderRadius: '50%', textAlign: 'center', display: 'block', width: '23px', height: '23px'}}>{proj.ads}</span></div> */}
            <div style={{marginLeft: '32px', fontSize: '21px', lineHeight: '13px', marginTop: 'auto', marginBottom: 'auto'}}>
				{props.store.editId !== proj.id &&
				<div
					onClick={() => props.onEdit()}
                    style={{color: '#b5b2b2', cursor: 'pointer'}}
		            className={`js-selected-navigation-item Header-link mt-md-n3 mb-md-n3 py-2 py-md-3 mr-0 mr-md-3 border-top border-md-top-0 border-white-fade`}
				>{proj.name}</div>}
                        
				{props.store.editId === proj.id &&
				<div>
                	<Button onClick={() => props.store.endEdit()} style={{marginRight: '10px'}}>Применить</Button>
                	<Button onClick={() => props.store.cancelEdit()} style={{marginRight: '10px'}}>Сбросить</Button>
					<input style={{
						width: '400px',
						fontSize: '16px',
						border: '1px solid #ccc',
						borderRadius: '5px',
						outline: 'none'
					}} type='text' value={props.store.editName} onChange={(e) => props.store.editName = e.target.value}></input>
				</div>
				}
            </div>
            {props.canArchive &&
            <div style={{marginLeft: 'auto'}}>
                <Button onClick={() => props.onArchive()} style={{marginLeft: '10px'}}>Удалить</Button>
            </div>}
        </div>
        {/* {proj.tags.length !== 0 && <FeedTags tags={proj.tags} onClick={tag => console.log(tag)}/>} */}
    </div>
});