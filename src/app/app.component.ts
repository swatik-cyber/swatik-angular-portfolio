import { Component, OnInit, HostListener } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  template: `
    <div class="scroll-progress" [style.width.%]="scrollPct"></div>
    <div class="cursor-dot" [style.left.px]="cx" [style.top.px]="cy"></div>
    <div class="cursor-ring" [style.left.px]="cx" [style.top.px]="cy" [class.clicking]="clicking"></div>

    <!-- Page transition overlay -->
    <div class="page-transition" [class.active]="transitioning">
      <div class="pt-content">
        <div class="pt-logo">[SB]</div>
        <div class="pt-bar"><div class="pt-bar-fill"></div></div>
        <div class="pt-text">{{ transitionText }}</div>
      </div>
      <div class="pt-lines">
        <div class="ptl" *ngFor="let l of [1,2,3,4,5]"></div>
      </div>
    </div>

    <app-navbar></app-navbar>
    <div [class.page-content]="true" [class.fade-in]="!transitioning">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .scroll-progress { position:fixed; top:0; left:0; right:0; height:2px; z-index:1000; background:linear-gradient(90deg,#00f5d4,#7c3aed,#ec4899); transition:width .08s; box-shadow:0 0 8px rgba(0,245,212,.5); }
    .cursor-dot { position:fixed; width:6px; height:6px; background:#00f5d4; border-radius:50%; pointer-events:none; z-index:9999; transform:translate(-50%,-50%); box-shadow:0 0 8px rgba(0,245,212,.8); }
    .cursor-ring { position:fixed; width:28px; height:28px; border:1px solid rgba(0,245,212,.4); border-radius:50%; pointer-events:none; z-index:9998; transform:translate(-50%,-50%); transition:left .1s ease,top .1s ease; }
    .cursor-ring.clicking { transform:translate(-50%,-50%) scale(.7); border-color:rgba(0,245,212,.8); }

    /* Page transition */
    .page-transition {
      position:fixed; inset:0; z-index:9000; background:#020408;
      display:flex; align-items:center; justify-content:center;
      pointer-events:none; opacity:0; transition:opacity .3s;
    }
    .page-transition.active { opacity:1; pointer-events:all; }
    .pt-content { text-align:center; position:relative; z-index:2; }
    .pt-logo { font-family:'Orbitron',monospace; font-size:3rem; font-weight:900; color:#00f5d4; text-shadow:0 0 40px rgba(0,245,212,.8); animation:glitch 0.3s infinite; }
    @keyframes glitch {
      0%{text-shadow:0 0 40px rgba(0,245,212,.8);transform:translate(0)}
      20%{text-shadow:-2px 0 #f59e0b,2px 0 #7c3aed;transform:translate(-1px,0)}
      40%{text-shadow:2px 0 #ec4899,-2px 0 #00f5d4;transform:translate(1px,0)}
      60%{text-shadow:-1px 0 #00f5d4,1px 0 #f59e0b;transform:translate(0)}
      80%{text-shadow:1px 0 #7c3aed,-1px 0 #ec4899;transform:translate(1px,0)}
      100%{text-shadow:0 0 40px rgba(0,245,212,.8);transform:translate(0)}
    }
    .pt-bar { width:200px; height:2px; background:rgba(255,255,255,.1); margin:1.5rem auto; overflow:hidden; }
    .pt-bar-fill { height:100%; background:linear-gradient(90deg,#00f5d4,#7c3aed); animation:loadBar 0.5s ease forwards; }
    @keyframes loadBar { 0%{width:0}100%{width:100%} }
    .pt-text { font-family:'Space Mono',monospace; font-size:.65rem; letter-spacing:4px; color:#475569; }
    .pt-lines { position:absolute; inset:0; overflow:hidden; }
    .ptl { position:absolute; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(0,245,212,.1),transparent); animation:scanPt 0.5s linear infinite; }
    .ptl:nth-child(1){animation-delay:0s;top:20%} .ptl:nth-child(2){animation-delay:.1s;top:40%} .ptl:nth-child(3){animation-delay:.2s;top:60%} .ptl:nth-child(4){animation-delay:.3s;top:80%} .ptl:nth-child(5){animation-delay:.05s;top:10%}
    @keyframes scanPt { 0%{opacity:0;transform:scaleX(0)}50%{opacity:1;transform:scaleX(1)}100%{opacity:0;transform:scaleX(0)} }

    .page-content { opacity:1; transition:opacity .3s; }
    .page-content.fade-in { animation:fadeInPage .4s ease; }
    @keyframes fadeInPage { from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)} }
  `]
})
export class AppComponent implements OnInit {
  scrollPct = 0; cx = -100; cy = -100; clicking = false;
  transitioning = false;
  transitionText = 'LOADING...';
  private pages: Record<string, string> = {
    '/': 'HOME', '/projects': 'PROJECTS', '/skills': 'SKILLS',
    '/experience': 'EXPERIENCE', '/certifications': 'CERTIFICATIONS',
    '/contact': 'CONTACT', '/resume': 'RESUME', '/dashboard': 'DASHBOARD', '/admin': 'ADMIN'
  };

  constructor(private router: Router) {}

  ngOnInit() {
    window.addEventListener('mousemove', e => { this.cx = e.clientX; this.cy = e.clientY; });
    window.addEventListener('mousedown', () => this.clicking = true);
    window.addEventListener('mouseup', () => this.clicking = false);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.transitionText = this.pages[event.url] || 'LOADING...';
        this.transitioning = true;
      }
      if (event instanceof NavigationEnd) {
        setTimeout(() => this.transitioning = false, 500);
      }
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    const el = document.documentElement;
    this.scrollPct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
  }
}
