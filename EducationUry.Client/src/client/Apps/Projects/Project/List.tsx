import { FeedTags } from "../../../Layouts/FeedTags";
import {observer} from "mobx-react-lite";
import * as React from "react";
import { Store } from "./Store";
import {NavLink} from "react-router-dom";
import { Button } from "../../../Layouts/Button";
import { DateTime } from "../../../Shared/DateTime";

export const List = observer((props: {
    store: Store
}) => {
    const store = props.store;

    if (store.project === null) {
        return <div>Loading...</div>
    }

    const project = store.project!;
    const edit = store.editModel;

    const takeStudents = () => {
        const limit = 5;
        const existed = edit.model.students.map(x => x.id);
        if (edit.filterByStudents.replace(' ', '').length === 0) {
            return store.students.filter(x => !existed.includes(x.id)).splice(0, limit);
        }

        const regex = new RegExp(edit.filterByStudents.toLowerCase());
        return store.students
            .filter(x => !existed.includes(x.id) && regex.test(x.name.toLowerCase()))
            .splice(0, limit);
    };

    const takeAuthors = () => {
        const limit = 5;
        const existed = edit.model.authors.map(x => x.id);
        if (edit.filterByAuthors.replace(' ', '').length === 0) {
            return store.teachers.filter(x => !existed.includes(x.id)).splice(0, limit);
        }

        const regex = new RegExp(edit.filterByAuthors.toLowerCase());
        return store.teachers
            .filter(x => !existed.includes(x.id) && regex.test(x.name.toLowerCase()))
            .splice(0, limit);
    };

	return <div className='profile-container' style={{boxShadow: '0px 0px 12px -5px #ccc', borderRadius: '5px', marginTop: '10px', padding: `15px 15px ${project.students.length === 0 ? '15px' : '0px'} 15px`, height: '100%'}}>
        <Dialog isOpen={edit.isShowAuthorsDialog} title="Авторы" onClose={() => edit.isShowAuthorsDialog = false}>
            <div>
                <input placeholder="Имя преподователя..." value={edit.filterByAuthors} onChange={(e) => edit.filterByAuthors = e.target.value} style={{
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    padding: '7px 14px',
                    outline: 'none',
                    width: '100%',
                }}/>
            </div>
            <div>
                {takeAuthors().map(a => <div key={a.id} style={{margin: '7px 0px', display: 'flex'}}>
                    <div style={{
                        border: '1px solid #ccc',
                        borderRadius: '6px',// цикловидная
                        textAlign: 'center',
                        padding: '0px 3px',
                        cursor: 'pointer',
                        marginRight: '7px',
                        width: '25px'
                    }} onClick={() => edit.model.authors.push(a)}>+</div>
                    <span style={{lineHeight: '22px'}}>{a.name}</span>
                </div>)}
            </div>
        </Dialog>
        <Dialog isOpen={edit.isShowStunetsDialog} title="Студенты" onClose={() => edit.isShowStunetsDialog = false}>
            <div>
                <input placeholder="Имя ученика..." value={edit.filterByStudents} onChange={(e) => edit.filterByStudents = e.target.value} style={{
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    padding: '7px 14px',
                    outline: 'none',
                    width: '100%',
                }}/>
            </div>
            <div>
                {takeStudents().map(a => <div key={a.id} style={{margin: '7px 0px', display: 'flex'}}>
                    <div style={{
                        border: '1px solid #ccc',
                        borderRadius: '6px',// цикловидная
                        textAlign: 'center',
                        padding: '0px 3px',
                        cursor: 'pointer',
                        marginRight: '7px',
                        width: '25px'
                    }} onClick={() => edit.model.students.push(a)}>+</div>
                    <span style={{lineHeight: '22px'}}>{a.name}</span>
                </div>)}
            </div>
        </Dialog>

        <div style={{display:"flex"}}>
            <div style={{marginLeft: '0px', marginTop: '4px'}}><span style={{border: '1px solid #ccc', borderRadius: '50%', textAlign: 'center', display: 'block', width: '23px', height: '23px', position: 'absolute', marginTop: '-4px'}}>{project.students.length}</span></div>
            <div style={{marginLeft: '32px', fontSize: '21px', lineHeight: '13px'}}>
                <div 
                    style={{color: '#b5b2b2'}}
		            className={`js-selected-navigation-item Header-link mt-md-n3 mb-md-n3 py-2 py-md-3 mr-0 mr-md-3 border-top border-md-top-0 border-white-fade`}>
                        <input type='text' value={edit.model.name} onChange={e => edit.model.name = e.target.value} style={{
                            minWidth: '400px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            padding: '2px 7px'
                        }} disabled={!edit.editing}/>
                </div>
            </div>
            <div style={{marginLeft: 'auto'}}>
                {/* <span>{new DateTime(new Date(project.created)).toShortWhenString(true)}</span> */}
                {!edit.editing && <Button onClick={() => store.edit()} style={{marginLeft: '10px'}}>Редактировать</Button>}
                {edit.editing && <div>
                        <Button onClick={() => store.cancelEdit()} style={{marginLeft: '10px', background: '#f5e9e9'}}>Отменить</Button>
                        <Button onClick={() => store.saveEdit()} style={{marginLeft: '10px'}}>Сохранить</Button>
                    </div>}
            </div>
        </div>
        <div style={{color: '#9b9b9b'}}>
            <div>
                <textarea value={edit.model.description} onChange={e => edit.model.description = e.target.value} style={{
                    width: '100%',
                    marginTop: '7px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '3px 7px',
                    resize: 'none',
                    height: '200px'
                }} disabled={!edit.editing}/>
            </div>
            <div style={{margin: '7px 0px'}}>
                <div style={{color: 'rgb(181, 178, 178)', fontSize: '16px'}}>
                    <b>Авторы</b>
                    {edit.editing &&
                    <Button onClick={() => edit.isShowAuthorsDialog = true} style={{
                        borderRadius: '50%',
                        padding: '0px',
                        minWidth: '0px',
                        width: '31px',
                        marginLeft: '7px'
                    }}>+</Button>}
                </div>
                <div>{edit.model.authors.map(author =>
                    <div key={author.id} style={{display: 'flex', marginTop: '3px'}}>
                        {edit.editing &&
                        <div style={{
                            border: '1px solid #ccc',
                            borderRadius: '6px',// цикловидная
                            textAlign: 'center',
                            padding: '0px 3px',
                            cursor: 'pointer',
                            marginRight: '7px'
                        }} onClick={() => edit.model.authors = edit.model.authors.filter(x => x.id !== author.id)}>Убрать</div>}
                        <span style={{lineHeight: '22px'}}>{author.name}</span>
                    </div>)}
                </div>
            </div>
            <div style={{margin: '7px 0px'}}>
                <div style={{color: 'rgb(181, 178, 178)', fontSize: '16px'}}>
                    <b>Учащиеся</b>
                    {edit.editing &&
                    <Button onClick={() => edit.isShowStunetsDialog = true} style={{
                        borderRadius: '50%',
                        padding: '0px',
                        minWidth: '0px',
                        width: '31px',
                        marginLeft: '7px'
                    }}>+</Button>}
                </div>
                <div>{edit.model.students.map(student =>
                    <div key={student.id} style={{display: 'flex', marginTop: '3px'}}>
                        {edit.editing &&
                        <div style={{
                            border: '1px solid #ccc',
                            borderRadius: '6px',// цикловидная
                            textAlign: 'center',
                            padding: '0px 3px',
                            cursor: 'pointer',
                            marginRight: '7px'
                        }} onClick={() => edit.model.students = edit.model.students.filter(x => x.id !== student.id)}>Снять</div>}
                        <span style={{lineHeight: '22px'}}>{student.name}</span>
                    </div>)}
                </div>
            </div>
            <div style={{margin: '7px 0px'}}>
                <div style={{color: 'rgb(181, 178, 178)', fontSize: '16px'}}>
                    <b>Материал</b>
                    <input type='file' style={{display: 'none'}} ref={store.btnUploadFile} onChange={e => store.uploadFile(e.target.files?.item(0) || null)}/>
                    {edit.editing &&
                    <Button onClick={() => store.btnUploadFile.current?.click()} style={{
                        marginLeft: '7px'
                    }}>Загрузить файл</Button>}
                </div>
                <div>{edit.model.files.map(file =>
                    <div key={file.id} style={{display: 'flex', marginTop: '3px'}}>
                        {edit.editing &&
                        <div style={{
                            border: '1px solid #ccc',
                            borderRadius: '6px',// цикловидная
                            textAlign: 'center',
                            padding: '0px 3px',
                            cursor: 'pointer',
                            marginRight: '7px'
                        }} onClick={() => edit.model.files = edit.model.files.filter(x => x.id !== file.id)}>Удалить</div>}
                        <a href={`http://localhost:8080/api/file/get/${file.id}`} download={`${file.name}${file.extension}`} style={{marginRight: '7px', display: 'inline'}}>{file.name}<span style={{color: '#ccc'}}>{file.extension}</span></a>
                    </div>)}
                </div>
            </div>
        </div>
    </div>
});

const Dialog = observer((props: {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children?: React.ReactElement | React.ReactElement[]
}) => {
    if (!props.isOpen)
        return <></>
	return <div>
        <div style={{
            width: 'calc(100% + 20px)',
            height: '100%',
            background: '#00000078',
            position: 'absolute',
            top: '0px',
            left: '-10px',
            zIndex: 1
        }} onClick={() => props.onClose()}></div>
        <div style={{
            width: '700px',
            background: '#fff',
            borderRadius: '5px',
            position: 'absolute',
            left: 'calc(50% - 700px / 2)',
            top: '20%',
            boxShadow: '1px 1px 10px 5px #00000026',
            zIndex: 2,
            height: '50%'
        }}>
            <div style={{
                display: 'flex',
                padding: '7px',
                borderBottom: '1px solid #cccccc4d'
            }}>
                <div style={{
                    color: '#3c3c3c',
                    fontSize: '16px',
                    textAlign: 'center',
                    margin: '0px 16px',
                    fontWeight: 600
                }}>{props.title}</div>
                <Button onClick={() => props.onClose()} style={{marginLeft: 'auto'}}>Закрыть</Button>
            </div>
            <div style={{padding: '7px', color: '#807f7f'}}>
                {props.children}
            </div>
        </div>
    </div>
});