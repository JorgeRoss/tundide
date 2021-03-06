import { Component, OnInit, OnDestroy, ElementRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Rx';

/* development:start */
import * as $S from 'scriptjs';
/* development:end */


@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'terminal',
    styleUrls: ['terminal.component.scss'],
    templateUrl: 'terminal.component.html'
})
export class TerminalComponent implements OnInit, OnDestroy {
    @ViewChild('contactus') contactusModal: NgbModal;

    private subscription: Subscription;

    constructor(elm: ElementRef,
        public router: Router,
        public route: ActivatedRoute,
        private modalService: NgbModal) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                ga('set', 'page', event.urlAfterRedirects);
                ga('send', 'pageview');
            }
        });

        this.subscription = this.route.queryParams.subscribe(
            (queryParam: any) => {
                let token: string;

                if (queryParam['t']) {
                    token = queryParam['t'];
                    window.location.href = '/#/';
                    localStorage.setItem('token', queryParam['t']);
                } else {
                    token = localStorage.getItem('token');
                }
            });
    }

    ngOnInit() {
        /* development:start */
        $S('http://localhost:35729/livereload.js', function () {
            console.log('LiveReload Habilitado');
        });
        /* development:end */
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}