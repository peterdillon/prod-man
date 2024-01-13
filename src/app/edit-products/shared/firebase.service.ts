import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, DocumentData, CollectionReference, onSnapshot, QuerySnapshot, getDoc } from 'firebase/firestore';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  db: Firestore;
  bikes: CollectionReference<DocumentData>;
  private updatedSnapshot = new Subject<QuerySnapshot<DocumentData>>();
  obsr_UpdatedSnapshot = this.updatedSnapshot.asObservable();

  constructor() {
    initializeApp(environment.firebase);
    this.db = getFirestore();
    this.bikes = collection(this.db, 'bikes');
    onSnapshot(this.bikes, (snapshot) => {
      this.updatedSnapshot.next(snapshot);
    }, (err) => {
      console.log(err);
    })
  }

  async getBikes() {
    const snapshot = await getDocs(this.bikes);
    return snapshot;
  }

  async addBike(name: string, description: string, rating: string, price: number, quantity: number, type: string, image: string, logo: string) {
    await addDoc(this.bikes, {
      name, description, rating, price, quantity, type, image, logo 
    })
    return;
  }

  async deleteBike(docId: string) {
    const docRef = doc(this.db, 'bikes', docId);
    await deleteDoc(docRef);
    return;
  }

  async updateBike(docId: string, name: string, description: string, rating: string, price: number, quantity: number, type: string, image: string, logo: string) {
    const docRef = doc(this.db, 'bikes', docId);
    await updateDoc(docRef, { name, description, rating, price, quantity, type, image, logo })
    return;
  }
}