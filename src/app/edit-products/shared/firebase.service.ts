import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, DocumentData, CollectionReference, onSnapshot, QuerySnapshot } from 'firebase/firestore';
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

    // Get Realtime Data
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

  async addBike(name: string) {
    await addDoc(this.bikes, {
      name
    })
    return;
  }

  async deleteBike(docId: string) {
    const docRef = doc(this.db, 'bikes', docId)
    await deleteDoc(docRef);
    return;
  }

  async updateBike(docId: string, name: string) {
    const docRef = doc(this.db, 'bikes', docId);
    await updateDoc(docRef, { name })
    return;
  }
}