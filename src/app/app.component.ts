import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(router: Router, private snackBar: MatSnackBar) {
    console.log('not an app');
    router.navigate(['/home']);
  }

  ngOnInit() {
    if ((navigator as any).standalone === false) {
      // for ios
      this.snackBar.open('Add to Home Screen', null, { duration: 3000 });
    }
    if (!((navigator as any).standalone)) {
      //when user has not installed the app... he will see this snackbar/prompt
      if (window.matchMedia('(display-mode: browser)').matches) {
        console.log('into browser');
        window.addEventListener('beforeinstallprompt', event => {
          event.preventDefault();
          console.log('into browser before install');
          
          const sb = this.snackBar.open("Wanna install app?", "install", { duration: 10000 });
          sb.onAction().subscribe();
          (event as any).prompt();
          (event as any).userChoice.then(result => {
            if(result.outcome === 'dismissed') {
              console.log('installed');
            }
          });
        
        });
      }
    }

  }
}
