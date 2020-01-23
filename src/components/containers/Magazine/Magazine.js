import React, {Component} from 'react';
import Gallery from "../../primitive/Gallery/Gallery";
import {randStr} from "../../../utils/utils";

class Magazine extends Component {
  render() {
    return (
      <Gallery list={[
        {title: '롤 신규 캐릭터 세트 출시', link: `/magazine/${randStr(10)}?category=magazine`, explain: '2020-01-20', img: 'https://img.resized.co/dexerto/eyJkYXRhIjoie1widXJsXCI6XCJodHRwczpcXFwvXFxcL2ltYWdlcy5kZXhlcnRvLmNvbVxcXC91cGxvYWRzXFxcLzIwMjBcXFwvMDFcXFwvMDIxNjI3NTFcXFwvcmlvdC1yZXZlYWwtaWYtZHJhdmVuLXNldHQtZmF0aGVyLTEwMjR4NTc2LmpwZ1wiLFwid2lkdGhcIjo2MjAsXCJoZWlnaHRcIjozNDcsXCJkZWZhdWx0XCI6XCJodHRwczpcXFwvXFxcL3MzLWV1LXdlc3QtMS5hbWF6b25hd3MuY29tXFxcL3BwbHVzLmltYWdlcy5kZXhlcnRvLmNvbVxcXC91cGxvYWRzXFxcLzIwMTlcXFwvMTFcXFwvMTEyMTQ5NDNcXFwvcGxhY2Vob2xkZXIuanBnXCJ9IiwiaGFzaCI6ImU0OWZiODBhMjhkOTAwNzBmMGNhZDFhNDI5MWUzZjNkNzMzZWIyZGQifQ==/riot-reveal-whether-league-of-legends-champion-draven-is-sett-s-father.jpg'},
        {title: '롤 신규 캐릭터 세트 출시', explain: '2020-01-20', img: 'https://img.resized.co/dexerto/eyJkYXRhIjoie1widXJsXCI6XCJodHRwczpcXFwvXFxcL2ltYWdlcy5kZXhlcnRvLmNvbVxcXC91cGxvYWRzXFxcLzIwMjBcXFwvMDFcXFwvMDIxNjI3NTFcXFwvcmlvdC1yZXZlYWwtaWYtZHJhdmVuLXNldHQtZmF0aGVyLTEwMjR4NTc2LmpwZ1wiLFwid2lkdGhcIjo2MjAsXCJoZWlnaHRcIjozNDcsXCJkZWZhdWx0XCI6XCJodHRwczpcXFwvXFxcL3MzLWV1LXdlc3QtMS5hbWF6b25hd3MuY29tXFxcL3BwbHVzLmltYWdlcy5kZXhlcnRvLmNvbVxcXC91cGxvYWRzXFxcLzIwMTlcXFwvMTFcXFwvMTEyMTQ5NDNcXFwvcGxhY2Vob2xkZXIuanBnXCJ9IiwiaGFzaCI6ImU0OWZiODBhMjhkOTAwNzBmMGNhZDFhNDI5MWUzZjNkNzMzZWIyZGQifQ==/riot-reveal-whether-league-of-legends-champion-draven-is-sett-s-father.jpg'},
        {title: '롤 신규 캐릭터 세트 출시', explain: '2020-01-20', img: 'https://img.resized.co/dexerto/eyJkYXRhIjoie1widXJsXCI6XCJodHRwczpcXFwvXFxcL2ltYWdlcy5kZXhlcnRvLmNvbVxcXC91cGxvYWRzXFxcLzIwMjBcXFwvMDFcXFwvMDIxNjI3NTFcXFwvcmlvdC1yZXZlYWwtaWYtZHJhdmVuLXNldHQtZmF0aGVyLTEwMjR4NTc2LmpwZ1wiLFwid2lkdGhcIjo2MjAsXCJoZWlnaHRcIjozNDcsXCJkZWZhdWx0XCI6XCJodHRwczpcXFwvXFxcL3MzLWV1LXdlc3QtMS5hbWF6b25hd3MuY29tXFxcL3BwbHVzLmltYWdlcy5kZXhlcnRvLmNvbVxcXC91cGxvYWRzXFxcLzIwMTlcXFwvMTFcXFwvMTEyMTQ5NDNcXFwvcGxhY2Vob2xkZXIuanBnXCJ9IiwiaGFzaCI6ImU0OWZiODBhMjhkOTAwNzBmMGNhZDFhNDI5MWUzZjNkNzMzZWIyZGQifQ==/riot-reveal-whether-league-of-legends-champion-draven-is-sett-s-father.jpg'},
        {title: '롤 신규 캐릭터 세트 출시', explain: '2020-01-20', img: 'https://img.resized.co/dexerto/eyJkYXRhIjoie1widXJsXCI6XCJodHRwczpcXFwvXFxcL2ltYWdlcy5kZXhlcnRvLmNvbVxcXC91cGxvYWRzXFxcLzIwMjBcXFwvMDFcXFwvMDIxNjI3NTFcXFwvcmlvdC1yZXZlYWwtaWYtZHJhdmVuLXNldHQtZmF0aGVyLTEwMjR4NTc2LmpwZ1wiLFwid2lkdGhcIjo2MjAsXCJoZWlnaHRcIjozNDcsXCJkZWZhdWx0XCI6XCJodHRwczpcXFwvXFxcL3MzLWV1LXdlc3QtMS5hbWF6b25hd3MuY29tXFxcL3BwbHVzLmltYWdlcy5kZXhlcnRvLmNvbVxcXC91cGxvYWRzXFxcLzIwMTlcXFwvMTFcXFwvMTEyMTQ5NDNcXFwvcGxhY2Vob2xkZXIuanBnXCJ9IiwiaGFzaCI6ImU0OWZiODBhMjhkOTAwNzBmMGNhZDFhNDI5MWUzZjNkNzMzZWIyZGQifQ==/riot-reveal-whether-league-of-legends-champion-draven-is-sett-s-father.jpg'},
      ]}/>
    );
  }
}

export default Magazine;