# be-hashing-out

Elevate the trust level of HTML Fragments.

## The catch-22 of web development

>  Enabling unfettered JavaScript unintentionally in the browser can be dangerous, as it allows XSS attacks.  Therefore, (in addition to performance and accessibility reasons), use less JavaScript, more HTML.  However, if the HTML contains any explicit JavaScript in the event handlers, you're back to square one since the browser won't support you with nonce/hash, and script tags can't identify where in the DOM it is.  So.... just give up and write the whole thing in JavaScript.

*be-hashing-out* can't help but long for the the brevity and sorcery on [display here](https://www.w3schools.com/TAGs/tag_output.asp):

```html
<form oninput="result.value=parseInt(a.value)+parseInt(b.value)">
     <input type=range id=a name=a value=50>
    +<input type=number id=b name=b value=25>
    =<output name=result for="a b"></output>
</form>
```


 This example was also formerly shared with MDN, but MDN abandoned simplicity for seemingly nonce-sensical security reasons (perhaps I'm wrong, thinking this out, which is what this repo is currently).

 Due to a lack of -- I'm not sure what -- the platform engineers have apparently failed to find a way to support brevity like this, even for trusted content coming from the host -- i.e. most "minimal" security measures throw the baby out with the bathwater, blocking our ability to do this (sigh).  How could they have supported it?  I *think* by allowing the nonce / hash attribute to apply to the parent element that contains inline scripts.  Maybe that was looked at and found problematic, who knows?  All I know is it is deeply unfortunate, and it appears to be resulting in solutions adopting makeshift handler syntax that is probably just as vulnerable to similar attacks as the native inline handlers are, only reduced by lack of widespread adoption.  And not solving this problem appears to me to driving a stake through the idea of progressive enhancement.

 ## Security concerns - Nonce in userland?

 ### Step 1

 ```html
 <fetch-for be-hashing-out
href=https://cors-anywhere.herokuapp.com/https://www.theonion.com/ 
as=html shadow=open ></fetch-for>
 ```

What the *be-hashing-out* enhancement does:  Since the value of the *be-hashing-out* attribute is empty, it emits a console.error with the expected SubtleCrypto.digest value, based on the attribute values (excluding the be-hashing-out attribute itself).

The console looks like:

> Suggested markup:

```html
<script type=module>
    import {register} from 'be-hashing-out/register.js';
    register('d61df4e4896765173a31dd0685866f0106c9b2b803f00096140d46e2e0dadc4f');
</script>
```

> Suggested Attr:
> be-hashing-out="d61df4e4896765173a31dd0685866f0106c9b2b803f00096140d46e2e0dadc4f"

### Step 2

Based on what is seen in the console, update the markup:

```html
<script type=module>
    import {register} from 'be-hashing-out/register.js';
    register('d61df4e4896765173a31dd0685866f0106c9b2b803f00096140d46e2e0dadc4f');
</script>

<fetch-for be-hashing-out=d61df4e4896765173a31dd0685866f0106c9b2b803f00096140d46e2e0dadc4f
href=https://cors-anywhere.herokuapp.com/https://www.theonion.com/ 
as=html shadow=open ></fetch-for>
```

What *be-hashing-out* does with the above markup, now that it contains a non trivial be-hashing-out value:

1.  Forms a string from the attributes other than be-hashing-out of the element it adorns just like before.
2.  Calculates the digest just like before.
3.  Verifies that the value was registered, and the value matches the value of the be-hashing-out attribute.
4.  If everything is in order, sets properties:
    1.  oFetchFor.beEnhanced.beHashingOut.resolved to true.
    2.  oFetchFor.beEnhanced.beHashingOut.rejected to false.
5.  If the values don't match, or the value isn't registered,  sets properties:
    1.  oFetchFor.beEnhanced.beHashingOut.rejected to true.
    2.  oFetchFor.beEnhanced.beHashingOut.resolved to false.
6.  If either case, two events with types "resolved" and "rejected" are dispatched.

## Who cares?

This enhancement doesn't do much by itself.  It is quietly provide information that it thinks will be useful to others.  And "who" are those others that would find this information useful?

At least two third parties would find it useful to now.

1.  Custom Elements that support attributes that could allow for XSS attacks from untrusted third-party (or user supplied) HTML
2.  Custom Enhancements that similarly support such attributes.

So what these custom elements / enhancements can do is:

1.  Attach this *be-hashing-out* enhancement (if not already attached -- which the be-enhanced functionality already accounts for):

```JavaScript
const {emc} = await import('be-hashing-out/emc.js');
const beHashingOut = oFetchFor.beEnhanced.whenResolved(emc);
if(beHashingOut.resolved){
    const {} = await import(')
}
```

## Viewing Locally

Any web server that serves static files will do but...

1.  Install git.
2.  Fork/clone this repo.
3.  Install node.
4.  Open command window to folder where you cloned this repo.
5.  > npm install
6.  > npm run serve
7.  Open http://localhost:3030/demo in a modern browser.

## Importing in ES Modules:

```JavaScript
import 'be-hashing-out/be-hashing-out.js';

```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-hashing-out';
</script>
```
