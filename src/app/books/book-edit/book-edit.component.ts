import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as fromAuth from './../../auth/store/auth.reducers';
import * as fromBooks from './../store/books.reducers';
import * as BooksActions from './../store/books.actions';
import { Book } from './../book.model';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
    @Input() book: Book;
    @ViewChild('secretPassword') secretPassword: ElementRef;
    bookForm: FormGroup;
    newBook: boolean;
    authenticated: boolean = false;
    password: string = '';
    toggleDelete: boolean = false;
    deletePossible: boolean = false;
    
    constructor(private store: Store<fromBooks.BooksState>, private router: Router) { }
    
    ngOnInit() {
        this.store.select('auth').subscribe(
            (authState: fromAuth.State) => {
                this.authenticated = authState.authenticated;
                this.password = authState.principal.password;
            }
        );
        if(!this.book){
            console.log("newBook");
            this.newBook = true;
        } else {
            console.log("!newBook");
            this.newBook = false;
        }
        this.initForm();   
    }

    initForm(){
        let path: string = null;
        let name: string = null;
        let author: string = null;
        let descriptionPl: string = null;
        let descriptionEn: string = null;
        let rating: number = null;
        let imagePath: string = null;
        let link: string = null;
        let pages: number = null;
        let posted: string = null;
        let lastUpdate: string = null;
        let commentsAvailable: boolean = true;
        
        let date = new Date().toISOString();
        let index = date.indexOf('T');
        let today = date.substr(0,index);
        let haveRead: string = today;
    
        if(this.book){
            path = this.book.path;
            name = this.book.name;
            author = this.book.author;
            descriptionPl = this.book.descriptionPl;
            descriptionEn = this.book.descriptionEn;
            rating = this.book.rating;
            imagePath = this.book.imagePath;
            link = this.book.link;
            pages = this.book.pages;
            haveRead = this.book.haveRead;
            posted = this.book.posted;
            lastUpdate = this.book.lastUpdate;
            commentsAvailable = this.book.commentsAvailable;        
        }
        this.bookForm = new FormGroup({
            'path': new FormControl(path, Validators.required),
            'name': new FormControl(name, Validators.required),
            'author': new FormControl(author, Validators.required),
            'descriptionPl': new FormControl(descriptionPl, Validators.required),
            'descriptionEn': new FormControl(descriptionEn, Validators.required),
            'rating': new FormControl(rating),
            'imagePath': new FormControl(imagePath, Validators.required),
            'link': new FormControl(link, Validators.required),
            'pages': new FormControl(pages, Validators.required),
            'haveRead': new FormControl(haveRead, Validators.required),
            'posted': new FormControl(posted),
            'lastUpdate': new FormControl(lastUpdate),
            'commentsAvailable': new FormControl(commentsAvailable)
        });            
    }
    
    onSubmit(){
        let book: Book;
        let id: number = null;
        if(this.book){
            id = this.book.id;
        }
        book = {
            ...this.bookForm.value,
            id: id
        }
        this.store.dispatch(new BooksActions.StoreBook(book));
        this.router.navigate(['/books']);
    }
    
    checkPassword(){
        console.log(this.authenticated, this.newBook, this.password, this.secretPassword.nativeElement.value);
        if(this.authenticated && !this.newBook){
            if(this.password === this.secretPassword.nativeElement.value){
                this.deletePossible = true;
                console.log("deletePossible");
            }
        }
    }
    
    deleteBook(){
        if(this.authenticated && !this.newBook){
            this.store.dispatch(new BooksActions.DeleteBook(this.book.id));
            this.router.navigate(['/books']);            
        }
    }
}
