import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Entity } from './entity.model';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Inject } from '@angular/core';

const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

export class EntityService<T extends Entity> {
  constructor(
    @Inject(HttpClient) protected http: HttpClient,
    @Inject(String) protected url: string,
    @Inject(String) protected endpoint: string
  ) {}

  public async list(options?: any): Promise<Observable<T[] | null>> {
    const endpoint = `${this.url}${this.endpoint}s`;
    console.log(`list ${this.endpoint}`);
    return this.http.get<T[]>(endpoint, { ...options, ...httpOptions }).pipe(
      tap((response: any) => {
        if (this.endpoint !== 'question') {
          console.log(response);
        }
      }),
      map((response: any) => response.result),
      catchError(this.handleError)
    );
  }

  public create(item: T, options?: any): Observable<T> {
    const endpoint = `${this.url}${this.endpoint}/create`;
    console.log(`create ${endpoint}`);
    return this.http
      .post<T>(endpoint, item, { ...options, ...httpOptions })
      .pipe(
        tap(console.log),
        // map((response: any) => response.result),
        catchError(this.handleError)
      );
  }

  public read(id: number | string, options?: any): Observable<T> {
    const endpoint = `${this.url}${this.endpoint}/${id}`;
    console.log(`read ${endpoint}`);
    return this.http
      .get<T[]>(endpoint, { ...options, ...httpOptions })
      .pipe(tap(console.log), catchError(this.handleError));
  }

  public update(item: T, options?: any): Observable<T> {
    const endpoint = `${this.url}${this.endpoint}/update/${item._id}`;
    console.log(`update ${endpoint}`);
    console.log(item);
    return this.http.put(endpoint, item, { ...options, ...httpOptions }).pipe(
      // map((response: any) => response.result),
      catchError(this.handleError)
    );
  }

  public delete(id: number | string, options?: any): Observable<T> {
    const endpoint = `${this.url}${this.endpoint}/delete/${id}`;
    console.log(`delete ${endpoint}`);
    return this.http.delete(endpoint, { ...options, ...httpOptions }).pipe(
      // map((response: any) => response.result),
      catchError(this.handleError)
    );
  }

  public joinTeam(
    playerId: string,
    teamId: string,
    options?: any
  ): Observable<T> {
    const endpoint = `${this.url}${this.endpoint}/${playerId}/join/${teamId}`;
    console.log(`subscribe ${endpoint}`);
    return this.http
      .put(endpoint, playerId, { ...options, ...httpOptions })
      .pipe(catchError(this.handleError));
  }

  public leaveTeam(
    playerId: string,
    teamId: string,
    options?: any
  ): Observable<T> {
    const endpoint = `${this.url}${this.endpoint}/${playerId}/leave/${teamId}`;
    console.log(`subscribe ${endpoint}`);
    return this.http
      .put(endpoint, playerId, { ...options, ...httpOptions })
      .pipe(catchError(this.handleError));
  }

  public activateEpisode(episodeId: string, options?: any): Observable<T> {
    const endpoint = `${this.url}${this.endpoint}/activate/${episodeId}`;
    console.log(`activate ${endpoint}`);
    return this.http
      .put(endpoint, episodeId, { ...options, ...httpOptions })
      .pipe(catchError(this.handleError));
  }

  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);

    const errorRespone = {
      type: 'error',
      message: error.error.message || error.message,
    };

    return throwError(() => errorRespone);
  }
}
