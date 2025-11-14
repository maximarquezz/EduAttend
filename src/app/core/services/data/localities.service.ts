import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalitiesService {
  private http = inject(HttpClient);

  getProvinces() {
    return this.http.get(
      `https://apis.datos.gob.ar/georef/api/provincias?orden=nombre&aplanar=true&campos=id,nombre&max=50&inicio=0&exacto=true&formato=json`
    );
  }

  getCities(provinciaId: string) {
    return this.http.get(
      `https://apis.datos.gob.ar/georef/api/localidades?provincia=${provinciaId}&orden=nombre&aplanar=true&campos=id,nombre&max=500&inicio=0&exacto=true&formato=json`
    );
  }
}
