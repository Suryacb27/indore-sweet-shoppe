import Link from "next/link";
import { Facebook, Twitter, Instagram, Send, Sparkles, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-bg-dark border-t border-primary/10 pt-24 pb-12 overflow-hidden relative">
            {/* Decorative Patterns */}
            <div className="absolute top-0 right-0 w-96 h-96 admin-sidebar-pattern opacity-5 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="bg-primary p-2.5 rounded-xl text-white group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined block text-2xl">bakery_dining</span>
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-white tracking-tighter leading-none uppercase">Indore</h2>
                                <p className="text-[10px] tracking-[0.3em] font-bold text-primary uppercase">Sweet Shoppe</p>
                            </div>
                        </Link>
                        <p className="text-sm leading-relaxed text-slate-400 font-medium">
                            Bringing the legendary flavors of Malwa to the world since 1952. We believe in heritage, quality, and the pure joy of shared sweetness.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <a
                                    key={i}
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-primary hover:border-primary hover:text-white transition-all shadow-sm"
                                    href="#"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-primary" /> Curations
                        </h3>
                        <ul className="space-y-4 text-sm font-bold">
                            <li><Link className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group" href="/products?category=mithai">Signature Mithai <span className="w-0 group-hover:w-4 h-px bg-primary transition-all" /></Link></li>
                            <li><Link className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group" href="/products?category=namkeen">Namkeen Collection <span className="w-0 group-hover:w-4 h-px bg-primary transition-all" /></Link></li>
                            <li><Link className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group" href="/gifts">Festive Gifting <span className="w-0 group-hover:w-4 h-px bg-primary transition-all" /></Link></li>
                            <li><Link className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group" href="/story">The Legend <span className="w-0 group-hover:w-4 h-px bg-primary transition-all" /></Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-8">Service</h3>
                        <ul className="space-y-5 text-sm font-medium">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                                <span className="text-slate-400">Sarafa Bazaar, Indore, MP 452002</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400">
                                <Phone className="w-4 h-4 text-primary" /> +91 (731) 255-SWEET
                            </li>
                            <li className="flex items-center gap-3 text-slate-400">
                                <Mail className="w-4 h-4 text-primary" /> namaste@indoresweets.in
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-8">The Insider</h3>
                        <p className="text-sm text-slate-400 mb-6 font-medium">Subscribe for festive drops and legendary recipe stories.</p>
                        <form className="space-y-3">
                            <div className="relative group">
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary outline-none transition-all text-white placeholder:text-slate-600 font-bold"
                                    placeholder="your@email.com"
                                    type="email"
                                />
                                <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-white flex items-center justify-center rounded-lg hover:bg-primary/80 transition-all shadow-lg active:scale-95">
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center md:text-left">
                            © 2024 Indore Sweet Shoppe. Standard of Excellence Since 1952.
                        </p>
                        <div className="flex gap-4 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                            <Link href="/privacy" className="hover:text-primary">Privacy</Link>
                            <Link href="/terms" className="hover:text-primary">Terms</Link>
                            <Link href="/shipping" className="hover:text-primary">Returns</Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 saturate-0 opacity-30 invert hover:saturate-100 hover:opacity-100 transition-all duration-500">
                        <img className="h-4" alt="Visa" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcSblBY910uvhkZiUQCARfDXT4r1PS5YtEyraAajUhodwuYNsvANMUgYhhCKpb_UGZOqCb3UcKpw0bF8xjslf82dTht2j7hKo2iPnIkpHCgQVT3EtNn9icoSsppSrFth_MZVC-z_K890GiAHw_7FV5d1tCJo-H2fAg6rSwC9VZreIyVM-bnzammjRS9pmnqYk5oGdSdDjkdrpaPxa8ZAcxL--A0IrJIggDse9bryNP9I6Hd4kFy7UMuZPABTsO9pCxd2gTZKyaBg" />
                        <img className="h-4" alt="Mastercard" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_Simvh596n-FAWijJ3C40ttUge2Dp7AgNlr5ntffUszHlSQAJpyYVH1TQLYYgbZZm_wFiDMutACcc9BOwX4Mzb0leC1Fcy8nE4_74hVYYurPCWAQU3cjBEEEXs_Eej2UC0tkoXg4VTnu596RCi7_N40u6yFmsv-MSHEhztdoQ6PpsUfqUgVU8PHeCR85KVnty08eh9jyxG8yWh5YxYdIZ6WuEr3_11Yt32ky9T4-GafZMwfFvtMkY1oD_xTlb8YDc2Zgn6273cg" />
                        <img className="h-5" alt="UPI" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6WOxYuGSax20f_2bnzDQW0DfGNBhJNt3FjWOBYPlyaW1IQL6Ab8I623cEgQG1IZD71JOX9N4M--GeIQrnmAAJz4m_8XVDs4CiksKA8v1vPlxfXcB8pYfZ7Y8_QJQpJLXrdYVXuMLahySiw57nx3PUkCP3o5WVKTxmdzdQSehDwCI5ycqxkf4DRiCTGATqyPvn4UuKPDfdRbV8MmrfmyWf1QcUOR_B71VrC89LmAzDYVOY4aXuLAX1nqacMDJ2eUN1-KBazlAQsg" />
                    </div>
                </div>
            </div>
        </footer>
    );
}

